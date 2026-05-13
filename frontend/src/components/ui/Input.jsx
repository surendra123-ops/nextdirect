export function Input({ label, error, id, className = "", ...props }) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-medium text-neutral-700">{label}</span> : null}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none ring-emerald-600/0 transition placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
