import { FEATURED_LISTINGS } from "../../data/featuredListings.js";
import { PropertyCard } from "./PropertyCard.jsx";
import { Skeleton } from "../ui/Skeleton.jsx";

const preview = FEATURED_LISTINGS.slice(0, 3);

export function FeaturedProperties({ showSkeleton }) {
  const loading = Boolean(showSkeleton);

  return (
    <section className="border-b border-neutral-200 bg-neutral-50 py-12 sm:py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-lg font-semibold text-neutral-900">Sample listings</h2>
        <p className="mt-1 text-sm text-neutral-600">Placeholder cards until you plug in a real feed.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                  <Skeleton className="h-36 w-full rounded-none" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-5 w-20 pt-2" />
                  </div>
                </div>
              ))
            : preview.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} onPrimaryAction={() => {}} />
              ))}
        </div>
      </div>
    </section>
  );
}
