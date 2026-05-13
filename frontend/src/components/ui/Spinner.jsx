export function Spinner({ className = "h-6 w-6" }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
