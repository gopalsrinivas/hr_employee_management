"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiActivity, FiBriefcase, FiCalendar, FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";
import AppShell from "../../components/layout/AppShell";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import { PageSkeleton } from "../../components/ui/LoadingState";
import apiClient from "../../services/apiClient";
import { normalizeApiError } from "../../utils/apiError";

const getValue = (source, keys, fallback = 0) => {
  for (const key of keys) {
    if (source?.[key] !== undefined) return source[key];
  }
  return fallback;
};

export default function DashboardPage() {
  const [state, setState] = useState({ summary: null, departments: [], attendance: null, leaves: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summary, departments, attendance, leaves] = await Promise.all([
          apiClient.get("/dashboard/summary"),
          apiClient.get("/dashboard/department-summary"),
          apiClient.get("/dashboard/attendance-summary"),
          apiClient.get("/dashboard/leave-summary")
        ]);
        setState({
          summary: summary.data.data || {},
          departments: departments.data.data || [],
          attendance: attendance.data.data || {},
          leaves: leaves.data.data || {}
        });
      } catch (error) {
        toast.error(normalizeApiError(error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = [
    { title: "Total Employees", value: getValue(state.summary, ["totalEmployees", "employees", "total_employees"]), icon: FiUsers, accent: "teal" },
    { title: "Present Today", value: getValue(state.attendance, ["present", "presentEmployees", "present_today"]), icon: FiCalendar, accent: "blue" },
    { title: "Departments", value: getValue(state.summary, ["departments", "totalDepartments", "total_departments"]), icon: FiBriefcase, accent: "violet" },
    { title: "Pending Leaves", value: getValue(state.leaves, ["pending", "pendingLeaves", "pending_leaves"]), icon: FiActivity, accent: "amber" },
    { title: "Payroll Processed", value: getValue(state.summary, ["payrollProcessed", "payroll_processed"]), icon: FiDollarSign, accent: "coral" },
    { title: "Employees Exiting", value: getValue(state.summary, ["employeesExiting", "employees_exiting"]), icon: FiTrendingUp, accent: "blue" }
  ];

  return (
    <AppShell>
      <PageHeader title="Dashboard" description="A live operational view across employees, attendance, leaves, payroll, and exits." />
      {isLoading ? (
        <PageSkeleton />
      ) : (
        <section className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-950">Department Wise Employees</h2>
              <div className="mt-4 space-y-3">
                {(Array.isArray(state.departments) ? state.departments : []).slice(0, 8).map((item, index) => {
                  const label = item.department_name || item.name || `Department ${index + 1}`;
                  const value = Number(item.employee_count || item.count || item.total || 0);
                  const width = `${Math.min(100, Math.max(8, value * 10))}%`;
                  return (
                    <div key={label}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700">{label}</span>
                        <span className="text-slate-500">{value}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-teal" style={{ width }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-950">Workflow Snapshot</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Attendance health", getValue(state.attendance, ["attendanceRate", "rate"], "Ready")],
                  ["Leave decisions", getValue(state.leaves, ["approved", "approvedLeaves"], 0)],
                  ["New joiners", getValue(state.summary, ["newJoiners", "new_joiners"], 0)],
                  ["Birthdays today", getValue(state.summary, ["todaysBirthdays", "birthdays"], 0)]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      )}
    </AppShell>
  );
}
