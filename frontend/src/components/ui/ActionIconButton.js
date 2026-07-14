"use client";

const tones = {
  view: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100 focus-visible:ring-cyan-300",
  edit: "bg-amber-50 text-amber-700 hover:bg-amber-100 focus-visible:ring-amber-300",
  delete: "bg-rose-50 text-rose-700 hover:bg-rose-100 focus-visible:ring-rose-300",
  neutral: "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-300"
};

export default function ActionIconButton({ label, tone = "neutral", children, className = "", ...props }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition focus:outline-none focus-visible:ring-4 ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
