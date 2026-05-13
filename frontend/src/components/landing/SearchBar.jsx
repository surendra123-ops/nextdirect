import { Button } from "../ui/Button.jsx";

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search by locality, project, or landmark",
  className = "",
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(value);
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 sm:flex-row sm:items-stretch ${className}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[44px] flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
      />
      <Button type="submit" className="min-h-[44px] shrink-0 px-5 text-sm sm:w-auto">
        Search
      </Button>
    </form>
  );
}
