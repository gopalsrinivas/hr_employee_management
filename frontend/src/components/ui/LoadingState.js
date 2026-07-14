export function PageSkeleton() {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="h-24 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-32 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-32 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-32 animate-pulse rounded-lg bg-slate-200" />
      </div>
      <div className="h-96 animate-pulse rounded-lg bg-slate-200" />
    </div>
  );
}

export function Spinner({ label = "Loading" }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal border-t-transparent" />
      {label}
    </div>
  );
}
