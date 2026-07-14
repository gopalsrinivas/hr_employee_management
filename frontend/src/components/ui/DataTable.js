"use client";

import { FiArrowDown, FiArrowUp, FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { styles } from "../../config/theme";
import ActionIconButton from "./ActionIconButton";
import EmptyState from "./EmptyState";
import StatusBadge from "./StatusBadge";

const renderValue = (record, column) => {
  const value = column.render ? column.render(record) : record[column.key];

  if (column.type === "status") return <StatusBadge value={value} />;
  if (typeof value === "boolean") return <StatusBadge value={value} />;
  return value ?? "-";
};

export default function DataTable({ columns, records, sortBy, order, onSort, onView, onEdit, onDelete, actions = [] }) {
  if (!records?.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className={styles.tableHeader}>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                  {column.sortable ? (
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => onSort(column.key)}>
                      {column.label}
                      {sortBy === column.key ? (
                        order === "ASC" ? (
                          <FiArrowUp aria-hidden="true" />
                        ) : (
                          <FiArrowDown aria-hidden="true" />
                        )
                      ) : null}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {records.map((record) => (
              <tr key={record.id} className="transition hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="max-w-xs whitespace-nowrap px-4 py-3 text-slate-700">
                    {renderValue(record, column)}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {onView ? (
                      <ActionIconButton label="View record" tone="view" onClick={() => onView(record)}>
                        <FiEye aria-hidden="true" />
                      </ActionIconButton>
                    ) : null}
                    {onEdit ? (
                      <ActionIconButton label="Edit record" tone="edit" onClick={() => onEdit(record)}>
                        <FiEdit2 aria-hidden="true" />
                      </ActionIconButton>
                    ) : null}
                    {actions.map((action) => (
                      <ActionIconButton
                        key={action.label}
                        label={action.label}
                        tone={action.tone || "neutral"}
                        onClick={() => action.onClick(record)}
                      >
                        {action.icon ? <action.icon aria-hidden="true" /> : action.label}
                      </ActionIconButton>
                    ))}
                    {onDelete ? (
                      <ActionIconButton label="Delete record" tone="delete" onClick={() => onDelete(record)}>
                        <FiTrash2 aria-hidden="true" />
                      </ActionIconButton>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
