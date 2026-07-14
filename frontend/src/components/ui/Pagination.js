"use client";

import Button from "./Button";

export default function Pagination({ pagination, onPageChange, onLimitChange }) {
  const page = Number(pagination?.page || 1);
  const limit = Number(pagination?.limit || 10);
  const total = Number(pagination?.total || 0);
  const totalPages = Number(pagination?.totalPages || pagination?.pages || 1);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing page <span className="font-semibold text-slate-900">{page}</span> of{" "}
        <span className="font-semibold text-slate-900">{Math.max(totalPages, 1)}</span> for{" "}
        <span className="font-semibold text-slate-900">{total}</span> records
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
          aria-label="Rows per page"
        >
          {[10, 25, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value} rows
            </option>
          ))}
        </select>
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
