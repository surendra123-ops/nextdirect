export function PropertyCard({ listing, onPrimaryAction }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className={`h-36 bg-gradient-to-br ${listing.gradient} opacity-90`} />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-medium text-neutral-900">{listing.title}</h3>
        <p className="text-sm text-neutral-600">{listing.location}</p>
        {listing.tags?.[0] ? (
          <p className="text-xs text-neutral-500">{listing.tags[0]}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-sm font-semibold text-neutral-900">{listing.price}</p>
          <button
            type="button"
            onClick={onPrimaryAction}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
