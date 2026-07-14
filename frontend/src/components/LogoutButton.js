"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold transition hover:bg-slate-50"
    >
      <FiLogOut aria-hidden="true" />
      Logout
    </button>
  );
}
