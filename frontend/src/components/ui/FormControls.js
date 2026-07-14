"use client";

const baseControl =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-4 focus:ring-teal/10";

export function Field({ label, error, children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

export function TextInput({ error, className = "", ...props }) {
  return (
    <input
      className={`${baseControl} ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""} ${className}`}
      {...props}
    />
  );
}

export function TextArea({ error, className = "", ...props }) {
  return (
    <textarea
      rows={4}
      className={`${baseControl} resize-y ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""} ${className}`}
      {...props}
    />
  );
}

export function SelectInput({ options = [], error, placeholder = "Select", className = "", ...props }) {
  return (
    <select className={`${baseControl} ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""} ${className}`} {...props}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function CheckboxInput({ label, ...props }) {
  return (
    <label className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700">
      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal focus:ring-teal/20" {...props} />
      {label}
    </label>
  );
}
