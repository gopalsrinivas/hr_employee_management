"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiDownload, FiRefreshCw } from "react-icons/fi";
import AppShell from "../../components/layout/AppShell";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import apiClient from "../../services/apiClient";
import { reportCards } from "../../config/moduleConfigs";
import { normalizeApiError } from "../../utils/apiError";

export default function ReportsPage() {
  const [results, setResults] = useState({});
  const [loadingKey, setLoadingKey] = useState("");

  const runReport = async (report) => {
    setLoadingKey(report.endpoint);
    try {
      const response = await apiClient.get(report.endpoint);
      setResults((current) => ({ ...current, [report.endpoint]: response.data.data }));
      toast.success(`${report.title} refreshed`);
    } catch (error) {
      toast.error(normalizeApiError(error).message);
    } finally {
      setLoadingKey("");
    }
  };

  const exportReport = (report) => {
    const data = results[report.endpoint];
    if (!data) {
      toast.error("Run the report before exporting");
      return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${report.title.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AppShell>
      <PageHeader title="Reports" description="Run HR, attendance, leave, and payroll reports using the backend report APIs." />
      <section className="space-y-6 p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportCards.map((report) => (
            <StatCard key={report.endpoint} title={report.title} value={results[report.endpoint] ? "Ready" : "Not run"} icon={report.icon} accent="blue" />
          ))}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-3 p-4">
            {reportCards.map((report) => (
              <div key={report.endpoint} className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-950">{report.title}</h2>
                  <p className="text-sm text-slate-500">{report.endpoint}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" isLoading={loadingKey === report.endpoint} onClick={() => runReport(report)}>
                    <FiRefreshCw aria-hidden="true" />
                    Run
                  </Button>
                  <Button variant="secondary" onClick={() => exportReport(report)}>
                    <FiDownload aria-hidden="true" />
                    Export JSON
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!Object.keys(results).length ? <EmptyState title="No reports generated yet" description="Run a report to preview and export the latest backend data." /> : null}
      </section>
    </AppShell>
  );
}
