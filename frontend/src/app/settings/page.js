"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiLock, FiRefreshCw, FiServer } from "react-icons/fi";
import AppShell from "../../components/layout/AppShell";
import Button from "../../components/ui/Button";
import { Field, TextInput } from "../../components/ui/FormControls";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../services/apiClient";
import { normalizeApiError } from "../../utils/apiError";

export default function SettingsPage() {
  const { user, refreshProfile } = useAuth();
  const [health, setHealth] = useState("Not checked");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm();

  const checkHealth = async () => {
    try {
      const response = await apiClient.get("/health");
      setHealth(response.data.message || "Healthy");
      toast.success("Backend health check passed");
    } catch (error) {
      setHealth("Unavailable");
      toast.error(normalizeApiError(error).message);
    }
  };

  const changePassword = async (values) => {
    setIsSubmitting(true);
    clearErrors();
    try {
      await apiClient.post("/auth/change-password", values);
      toast.success("Password updated");
      reset();
    } catch (error) {
      const normalized = normalizeApiError(error);
      Object.entries(normalized.fieldErrors).forEach(([field, message]) => {
        setError(field, { type: "server", message });
      });
      toast.error(normalized.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <PageHeader title="Settings" description="Manage your session, profile refresh, backend health, and password." />
      <section className="space-y-6 p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Signed in as" value={user?.name || "User"} helper={user?.email} icon={FiLock} />
          <StatCard title="Backend Health" value={health} icon={FiServer} accent="blue" />
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">Session Tools</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={refreshProfile}>
                <FiRefreshCw aria-hidden="true" />
                Refresh Profile
              </Button>
              <Button variant="secondary" onClick={checkHealth}>
                <FiServer aria-hidden="true" />
                Check API
              </Button>
            </div>
          </article>
        </div>
        <form onSubmit={handleSubmit(changePassword)} className="max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">Change Password</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Current password" error={errors.oldPassword?.message} required>
              <TextInput type="password" {...register("oldPassword", { required: "Current password is required", onChange: () => clearErrors("oldPassword") })} />
            </Field>
            <Field label="New password" error={errors.newPassword?.message} required>
              <TextInput
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  onChange: () => clearErrors("newPassword"),
                  minLength: { value: 8, message: "Use at least 8 characters" }
                })}
              />
            </Field>
          </div>
          <div className="mt-5 flex justify-end">
            <Button type="submit" isLoading={isSubmitting}>
              Update password
            </Button>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
