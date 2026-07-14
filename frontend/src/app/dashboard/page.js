"use client";

import AuthGuard from "../../components/AuthGuard";
import LogoutButton from "../../components/LogoutButton";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <main className="min-h-screen bg-mist text-ink">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-slate-600">Authentication foundation is active.</p>
            </div>
            <LogoutButton />
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Signed in as</p>
            <h2 className="mt-2 text-lg font-semibold">{user?.name || "User"}</h2>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Email</p>
            <h2 className="mt-2 break-words text-lg font-semibold">{user?.email}</h2>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Role</p>
            <h2 className="mt-2 text-lg font-semibold">{user?.role?.name || "Assigned"}</h2>
          </article>
        </section>
      </main>
    </AuthGuard>
  );
}
