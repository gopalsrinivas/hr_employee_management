"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlus, FiRefreshCw, FiRotateCcw, FiX } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../services/apiClient";
import { createResource, deleteResource, listResource, updateResource } from "../../services/resourceService";
import { styles } from "../../config/theme";
import { normalizeApiError } from "../../utils/apiError";
import { getRecordName, normalizeRole } from "../../utils/formatters";
import AppShell from "../layout/AppShell";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import DataTable from "../ui/DataTable";
import { CheckboxInput, Field, SelectInput, TextArea, TextInput } from "../ui/FormControls";
import { PageSkeleton } from "../ui/LoadingState";
import Modal from "../ui/Modal";
import PageHeader from "../ui/PageHeader";
import Pagination from "../ui/Pagination";

const canAccess = (allowed, role) => {
  if (Array.isArray(allowed)) return allowed.includes(role);
  return true;
};

const fieldDefault = (field) => {
  if (field.type === "checkbox") return false;
  return "";
};

const toOptions = (options = []) =>
  options.map((option) =>
    typeof option === "object" ? option : { value: option, label: option }
  );

const baseFilters = { page: 1, limit: 10, search: "", sortBy: "id", order: "DESC" };

const getFilterLabel = (field, value, lookupState) => {
  if (!value) return "";
  if (field.lookup) {
    return lookupState[field.lookup]?.options?.find((option) => String(option.value) === String(value))?.label || value;
  }
  return toOptions(field.options).find((option) => String(option.value) === String(value))?.label || value;
};

const getAllLabel = (label) => {
  const lower = label.toLowerCase();
  if (lower.endsWith("status")) return "All Statuses";
  if (lower.endsWith("y")) return `All ${label.slice(0, -1)}ies`;
  return `All ${label}s`;
};

const createDefaults = (fields, record, generatedValues = {}) =>
  fields.reduce((acc, field) => {
    const value = record?.[field.name] ?? generatedValues[field.name] ?? fieldDefault(field);
    acc[field.name] = field.lookup && value !== "" ? String(value) : value;
    return acc;
  }, {});

const preparePayload = (values, fields, isMultipart) => {
  if (isMultipart) {
    const formData = new FormData();
    fields.forEach((field) => {
      const value = values[field.name];
      if (field.type === "file") {
        if (value?.[0]) formData.append(field.name, value[0]);
        return;
      }
      if (field.submit === false) {
        return;
      }
      if (value !== "" && value !== undefined && value !== null) formData.append(field.name, value);
    });
    return formData;
  }

  return Object.fromEntries(
    fields
      .filter((field) => field.type !== "file" && field.submit !== false)
      .map((field) => [field.name, values[field.name]])
      .filter(([, value]) => value !== "" && value !== undefined && value !== null)
  );
};

function DynamicForm({
  fields,
  record,
  isMultipart,
  lookupState,
  generatedValues,
  generatedError,
  submitError,
  onSubmit,
  onCancel,
  isSubmitting,
  isSubmitDisabled
}) {
  const effectiveFields = useMemo(
    () => (record ? fields.filter((field) => !field.createOnly) : fields),
    [fields, record]
  );
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: createDefaults(effectiveFields, record, generatedValues) });

  useEffect(() => {
    reset(createDefaults(effectiveFields, record, generatedValues));
  }, [effectiveFields, generatedValues, record, reset]);

  const submitForm = async (values) => {
    clearErrors();
    const result = await onSubmit(preparePayload(values, effectiveFields, isMultipart));

    if (result?.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field, { type: "server", message });
      });
    }
  };

  const renderField = (field) => {
    const error = errors[field.name]?.message;
    const rules = {
      required: field.required ? `${field.label} is required` : false,
      minLength: field.minLength ? { value: field.minLength, message: `${field.label} is too short` } : undefined
    };
    const registration = register(field.name, rules);
    const controlProps = {
      ...registration,
      onChange: (event) => {
        clearErrors(field.name);
        registration.onChange(event);
      }
    };

    if (field.type === "textarea") {
      return (
        <Field key={field.name} label={field.label} error={error} required={field.required}>
          <TextArea error={error} placeholder={field.placeholder} {...controlProps} />
        </Field>
      );
    }

    if (field.type === "select") {
      const lookup = field.lookup ? lookupState[field.lookup] : null;
      const options = lookup ? lookup.options : toOptions(field.options);

      return (
        <Field key={field.name} label={field.label} error={error} required={field.required}>
          <SelectInput
            error={error}
            placeholder={lookup?.isLoading ? `Loading ${field.label.toLowerCase()}...` : `Select ${field.label}`}
            options={options}
            disabled={lookup?.isLoading}
            {...controlProps}
          />
          {lookup?.error ? <span className="mt-1 block text-sm text-red-600">{lookup.error}</span> : null}
        </Field>
      );
    }

    if (field.type === "checkbox") {
      return <CheckboxInput key={field.name} label={field.label} {...controlProps} />;
    }

    return (
      <Field key={field.name} label={field.label} error={error} required={field.required}>
        <TextInput
          error={error}
          type={field.type === "file" ? "file" : field.inputType || field.type || "text"}
          placeholder={field.placeholder}
          readOnly={field.readOnly}
          step={field.type === "number" ? "0.01" : undefined}
          {...controlProps}
        />
      </Field>
    );
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      {submitError ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {submitError}
        </div>
      ) : null}
      {generatedError ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {generatedError}
        </div>
      ) : null}
      <div className={styles.formSection}>
        <h3 className="mb-4 text-sm font-semibold uppercase text-slate-600">Core details</h3>
        <div className="grid gap-4 md:grid-cols-2">{effectiveFields.map(renderField)}</div>
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitDisabled}>
          {record ? "Save changes" : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default function ModulePage({ config }) {
  const { user } = useAuth();
  const role = normalizeRole(user) || "employee";
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [filters, setFilters] = useState(baseFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRecord, setActiveRecord] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [lookupState, setLookupState] = useState({});
  const [generatedValues, setGeneratedValues] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedError, setGeneratedError] = useState("");

  const canCreate = canAccess(config.permissions?.create, role);
  const canEdit = canAccess(config.permissions?.edit, role);
  const canDelete = canAccess(config.permissions?.delete, role);
  const filterFields = useMemo(() => (config.filters || []).slice(0, 3), [config.filters]);
  const activeFilterChips = useMemo(() => {
    const chips = [];

    if (filters.search) {
      chips.push({ key: "search", label: "Search", value: filters.search });
    }

    filterFields.forEach((field) => {
      const value = filters[field.name];
      if (value !== undefined && value !== "") {
        chips.push({
          key: field.name,
          label: field.label,
          value: getFilterLabel(field, value, lookupState)
        });
      }
    });

    return chips;
  }, [filterFields, filters, lookupState]);
  const hasActiveFilters = activeFilterChips.length > 0;

  const loadRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await listResource(config.endpoint, filters);
      setRecords(result.records);
      setPagination(result.pagination);
    } catch (error) {
      toast.error(normalizeApiError(error).message);
    } finally {
      setIsLoading(false);
    }
  }, [config.endpoint, filters]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  useEffect(() => {
    const lookupFields = [...(config.fields || []), ...(config.filters || [])].filter((field) => field.lookup);
    const uniqueLookups = [...new Set(lookupFields.map((field) => field.lookup))];

    uniqueLookups.forEach(async (lookupKey) => {
      const lookupConfig = config.lookups?.[lookupKey];
      if (
        !lookupConfig ||
        lookupState[lookupKey]?.options?.length ||
        lookupState[lookupKey]?.isLoading ||
        lookupState[lookupKey]?.error
      ) {
        return;
      }

      setLookupState((current) => ({
        ...current,
        [lookupKey]: { options: [], isLoading: true, error: "" }
      }));

      try {
        const result = await listResource(lookupConfig.endpoint, { page: 1, limit: 100, ...(lookupConfig.params || {}) });
        setLookupState((current) => ({
          ...current,
          [lookupKey]: {
            options: result.records
              .filter((record) => (lookupConfig.activeOnly ? record.status !== false && record.is_active !== false : true))
              .map((record) => ({
                value: String(record[lookupConfig.valueKey || "id"]),
                label: lookupConfig.label(record)
              })),
            isLoading: false,
            error: ""
          }
        }));
      } catch (error) {
        const normalized = normalizeApiError(error);
        setLookupState((current) => ({
          ...current,
          [lookupKey]: { options: [], isLoading: false, error: normalized.message }
        }));
      }
    });
  }, [config.fields, config.filters, config.lookups, lookupState]);

  const columns = useMemo(() => config.columns || [], [config.columns]);
  const allowedActions = (config.rowActions || [])
    .filter((action) => canAccess(action.roles, role))
    .map((action) => ({
      ...action,
      onClick: async (record) => {
        try {
          const endpoint = typeof action.endpoint === "function" ? action.endpoint(record) : action.endpoint;
          const payload = typeof action.payload === "function" ? action.payload(record) : action.payload || {};
          const method = action.method || "patch";
          await apiClient[method](endpoint, payload);
          toast.success(`${action.label} completed`);
          loadRecords();
        } catch (error) {
          toast.error(normalizeApiError(error).message);
        }
      }
    }));

  const openCreate = () => {
    setActiveRecord(null);
    setSubmitError("");
    setGeneratedValues({});
    setGeneratedError("");
    setIsFormOpen(true);

    if (config.generatedFields?.length) {
      setIsGenerating(true);
      Promise.all(
        config.generatedFields.map(async (field) => {
          const response = await apiClient.get(field.endpoint);
          return [field.name, response.data.data?.[field.name] || ""];
        })
      )
        .then((entries) => {
          setGeneratedValues(Object.fromEntries(entries));
        })
        .catch((error) => {
          const normalized = normalizeApiError(error);
          setGeneratedError(normalized.message);
          toast.error(normalized.message);
        })
        .finally(() => {
          setIsGenerating(false);
        });
    }
  };

  const openEdit = (record) => {
    setActiveRecord(record);
    setSubmitError("");
    setGeneratedValues({});
    setGeneratedError("");
    setIsFormOpen(true);
  };

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      if (activeRecord) {
        await updateResource(config.endpoint, activeRecord.id, payload, config.updateMethod || "put");
        toast.success(`${config.title} updated`);
      } else {
        await createResource(config.createEndpoint || config.endpoint, payload, config.isMultipart ? { headers: { "Content-Type": "multipart/form-data" } } : undefined);
        toast.success(`${config.title} created`);
      }
      setIsFormOpen(false);
      setActiveRecord(null);
      loadRecords();
    } catch (error) {
      const normalized = normalizeApiError(error);
      setSubmitError(normalized.message);
      toast.error(normalized.message);
      return normalized;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteResource(config.endpoint, deleteTarget.id);
      toast.success(`${getRecordName(deleteTarget)} deleted`);
      setDeleteTarget(null);
      loadRecords();
    } catch (error) {
      toast.error(normalizeApiError(error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAction = async (action) => {
    try {
      await apiClient[action.method || "post"](action.endpoint, action.payload ? action.payload() : {});
      toast.success(`${action.label} completed`);
      loadRecords();
    } catch (error) {
      toast.error(normalizeApiError(error).message);
    }
  };

  const clearOneFilter = (name) => {
    setFilters((current) => ({ ...current, page: 1, [name]: "" }));
  };

  const clearAllFilters = () => {
    setFilters((current) => ({
      ...baseFilters,
      limit: current.limit
    }));
  };

  return (
    <AppShell>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            {(config.quickActions || []).map((action) => (
              <Button key={action.label} variant="secondary" onClick={() => handleQuickAction(action)}>
                {action.icon ? <action.icon aria-hidden="true" /> : null}
                {action.label}
              </Button>
            ))}
            <Button variant="secondary" onClick={loadRecords}>
              <FiRefreshCw aria-hidden="true" />
              Refresh
            </Button>
            {canCreate ? (
              <Button onClick={openCreate}>
                <FiPlus aria-hidden="true" />
                {config.createLabel || "Create"}
              </Button>
            ) : null}
          </>
        }
      />

      <section className="space-y-4 p-4 sm:p-6">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_repeat(3,minmax(170px,220px))_auto]">
            <div className="relative">
              <TextInput
                aria-label="Search"
                placeholder="Search records"
                value={filters.search}
                className="pr-10"
                onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
              />
              {filters.search ? (
                <button
                  type="button"
                  title="Clear search"
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
                  onClick={() => clearOneFilter("search")}
                >
                  <FiX aria-hidden="true" />
                </button>
              ) : null}
            </div>
            {filterFields.map((field) =>
              field.type === "select" ? (
                <SelectInput
                  key={field.name}
                  aria-label={field.label}
                  placeholder={getAllLabel(field.label)}
                  value={filters[field.name] || ""}
                  options={field.lookup ? lookupState[field.lookup]?.options || [] : toOptions(field.options)}
                  disabled={field.lookup ? lookupState[field.lookup]?.isLoading : false}
                  onChange={(event) => setFilters((current) => ({ ...current, page: 1, [field.name]: event.target.value }))}
                />
              ) : (
                <TextInput
                  key={field.name}
                  aria-label={field.label}
                  placeholder={field.label}
                  type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                  value={filters[field.name] || ""}
                  onChange={(event) => setFilters((current) => ({ ...current, page: 1, [field.name]: event.target.value }))}
                />
              )
            )}
            {hasActiveFilters ? (
              <Button variant="secondary" onClick={clearAllFilters}>
                <FiRotateCcw aria-hidden="true" />
                Clear Filters
              </Button>
            ) : null}
          </div>
          {activeFilterChips.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeFilterChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  title={`Remove ${chip.label} filter`}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 hover:bg-cyan-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
                  onClick={() => clearOneFilter(chip.key)}
                >
                  <span>{chip.label}: {chip.value}</span>
                  <FiX aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {isLoading ? (
          <PageSkeleton />
        ) : (
          <>
            <DataTable
              columns={columns}
              records={records}
              sortBy={filters.sortBy}
              order={filters.order}
              onSort={(key) =>
                setFilters((current) => ({
                  ...current,
                  sortBy: key,
                  order: current.sortBy === key && current.order === "ASC" ? "DESC" : "ASC"
                }))
              }
              onView={setViewRecord}
              onEdit={canEdit ? openEdit : null}
              onDelete={canDelete ? setDeleteTarget : null}
              actions={allowedActions}
            />
            <Pagination
              pagination={pagination}
              onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
              onLimitChange={(limit) => setFilters((current) => ({ ...current, page: 1, limit }))}
            />
          </>
        )}
      </section>

      <Modal
        isOpen={isFormOpen}
        title={activeRecord ? `Edit ${getRecordName(activeRecord)}` : config.createLabel}
        description="Complete the required fields and submit the form."
        onClose={() => setIsFormOpen(false)}
      >
        <DynamicForm
          fields={config.fields || []}
          record={activeRecord}
          isMultipart={config.isMultipart}
          lookupState={lookupState}
          generatedValues={generatedValues}
          generatedError={generatedError}
          submitError={submitError}
          isSubmitting={isSubmitting}
          isSubmitDisabled={isGenerating || Boolean(generatedError)}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <Modal isOpen={Boolean(viewRecord)} title={getRecordName(viewRecord)} onClose={() => setViewRecord(null)}>
        <dl className="grid gap-3 md:grid-cols-2">
          {viewRecord
            ? Object.entries(viewRecord)
                .filter(([, value]) => typeof value !== "object" || value === null)
                .map(([key, value]) => (
                  <div key={key} className="rounded-md bg-slate-50 p-3">
                    <dt className="text-xs font-semibold uppercase text-slate-500">{key}</dt>
                    <dd className="mt-1 break-words text-sm text-slate-900">{String(value ?? "-")}</dd>
                  </div>
                ))
            : null}
        </dl>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title={`Delete ${getRecordName(deleteTarget)}`}
        description="This record will be soft deleted where supported by the backend."
        confirmLabel="Delete"
        isLoading={isSubmitting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </AppShell>
  );
}
