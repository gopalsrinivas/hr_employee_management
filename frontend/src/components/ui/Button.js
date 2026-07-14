"use client";

const variants = {
  primary: "bg-cyan-600 text-white shadow-sm hover:bg-cyan-700 focus:ring-cyan-200",
  secondary: "border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 focus:ring-cyan-100",
  danger: "bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus:ring-rose-200",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus:ring-slate-200"
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  ...props
}) {
  const sizeClass = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm";

  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      {children}
    </button>
  );
}
