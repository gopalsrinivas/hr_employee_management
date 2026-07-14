import { FiInbox } from "react-icons/fi";

export default function EmptyState({ title = "No records found", description = "Try adjusting filters or create a new record." }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <FiInbox aria-hidden="true" className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
