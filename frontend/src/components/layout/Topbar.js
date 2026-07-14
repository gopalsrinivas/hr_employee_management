"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut, FiMenu, FiSearch } from "react-icons/fi";
import { styles } from "../../config/theme";
import { useAuth } from "../../contexts/AuthContext";
import { normalizeRole } from "../../utils/formatters";
import Button from "../ui/Button";

export default function Topbar({ onMenuClick }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const role = normalizeRole(user) || "employee";

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out");
    router.push("/login");
  };

  return (
    <header className={`sticky top-0 z-20 flex h-16 items-center justify-between px-4 sm:px-6 ${styles.topbar}`}>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="min-h-9 px-2 lg:hidden" onClick={onMenuClick} aria-label="Open menu">
          <FiMenu aria-hidden="true" />
        </Button>
        <div className="hidden min-w-72 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 ring-1 ring-white md:flex">
          <FiSearch aria-hidden="true" />
          Search people, payroll, reports
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-900">{user?.name || "User"}</p>
          <p className="text-xs uppercase text-slate-500">{role}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-700 text-sm font-semibold text-white shadow-sm">
          {(user?.name || "U").slice(0, 1).toUpperCase()}
        </span>
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <FiLogOut aria-hidden="true" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
