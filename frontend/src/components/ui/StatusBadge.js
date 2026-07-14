const toneMap = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  true: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  present: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  inactive: "bg-slate-100 text-slate-700 ring-slate-200",
  false: "bg-slate-100 text-slate-700 ring-slate-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
  absent: "bg-red-50 text-red-700 ring-red-200",
  exited: "bg-violet-50 text-violet-700 ring-violet-200",
  "notice period": "bg-sky-50 text-sky-700 ring-sky-200",
  completed: "bg-teal-50 text-teal-700 ring-teal-200"
};

export default function StatusBadge({ value }) {
  const label = typeof value === "boolean" ? (value ? "Active" : "Inactive") : value || "Pending";
  const tone = toneMap[String(label).toLowerCase()] || "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}>
      {label}
    </span>
  );
}
