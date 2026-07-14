"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { styles } from "../../config/theme";
import Button from "../ui/Button";

export default function Sidebar({ items, isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-slate-950/40 lg:hidden ${isOpen ? "block" : "hidden"}`} onClick={onClose} />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col transition lg:static lg:translate-x-0 ${styles.nav.shell} ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${styles.nav.brand}`}>HR</span>
            <span>
              <span className="block text-sm font-semibold text-white">Orfus HRMS</span>
              <span className="block text-xs text-slate-400">People operations</span>
            </span>
          </Link>
          <Button variant="ghost" size="sm" className="min-h-9 px-2 lg:hidden" onClick={onClose} aria-label="Close menu">
            <FiX aria-hidden="true" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                  active ? styles.nav.active : styles.nav.item
                }`}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
