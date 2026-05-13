export function Button({ children, className = "", variant = "primary", disabled, type = "button", ...props }) {
  const styles =
    variant === "ghost"
      ? "border border-neutral-200 bg-transparent text-neutral-800 hover:bg-neutral-100"
      : variant === "danger"
        ? "bg-rose-600 text-white hover:bg-rose-500"
        : variant === "outline"
          ? "border border-emerald-200 bg-white text-emerald-800 hover:border-emerald-400 hover:bg-emerald-50"
          : "bg-emerald-600 text-white shadow-sm shadow-emerald-900/10 hover:bg-emerald-500";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
