"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist text-ink">
        <p className="text-sm font-medium text-slate-600">Loading session</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
