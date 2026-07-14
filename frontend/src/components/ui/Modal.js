"use client";

import { FiX } from "react-icons/fi";
import Button from "./Button";

export default function Modal({ isOpen, title, description, children, onClose, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 px-4 py-6 sm:items-center">
      <div className="w-full max-w-3xl rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" aria-label="Close modal" onClick={onClose} className="min-h-9 px-2">
            <FiX aria-hidden="true" />
          </Button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 py-5">{children}</div>
        {footer ? <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
