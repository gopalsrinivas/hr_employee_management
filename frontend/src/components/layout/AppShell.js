"use client";

import { useMemo, useState } from "react";
import AuthGuard from "../AuthGuard";
import { useAuth } from "../../contexts/AuthContext";
import { navigationItems } from "../../config/navigation";
import { styles } from "../../config/theme";
import { normalizeRole } from "../../utils/formatters";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }) {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userRole = normalizeRole(user) || "employee";
  const items = useMemo(() => navigationItems.filter((item) => item.roles.includes(userRole)), [userRole]);

  return (
    <AuthGuard>
      <div className={`min-h-screen text-slate-900 ${styles.appBackground}`}>
        <div className="flex min-h-screen">
          <Sidebar items={items} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="min-w-0 flex-1">
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="pb-8">{children}</main>
            <footer className={styles.footer}>HR Employee Management System | Secure /api/v1 workspace</footer>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
