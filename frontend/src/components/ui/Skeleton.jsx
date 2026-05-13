export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-200/80 ${className}`} aria-hidden />;
}
