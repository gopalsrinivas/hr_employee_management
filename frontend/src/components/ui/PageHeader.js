export default function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
