export default function StatCard({ title, value, icon: Icon, accent = "teal", helper }) {
  const accents = {
    teal: "bg-cyan-100 text-cyan-700",
    coral: "bg-rose-100 text-rose-700",
    blue: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700"
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value ?? 0}</p>
          {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
        </div>
        {Icon ? (
          <span className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${accents[accent]}`}>
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        ) : null}
      </div>
    </article>
  );
}
