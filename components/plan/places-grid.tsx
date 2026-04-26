import type { PlanPlace } from "@/types/plan";
import { PlaceCard } from "@/components/plan/place-card";

type PlacesGridProps = {
  places: PlanPlace[];
  onToggle: (id: string) => void;
  onDetail: (id: string) => void;
};

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
      <span className="text-3xl">🗺</span>
      <p className="mt-3 text-sm font-medium text-slate-600">Tidak ada destinasi</p>
      <p className="mt-1 text-xs text-slate-400">Coba pilih kategori atau kota lain</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-36 animate-pulse bg-slate-100 sm:h-40" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-1/3 animate-pulse rounded bg-slate-100" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="h-2.5 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-3 flex gap-2">
          <div className="h-8 flex-1 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-8 flex-1 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export function PlacesGrid({ places, onToggle, onDetail }: PlacesGridProps) {
  return (
    <section>
      {/* Results count */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-800">{places.length}</span> destinasi tersedia
        </p>
        <button type="button" className="text-xs text-primary hover:underline">
          Urutkan ↕
        </button>
      </div>

      {places.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onToggle={onToggle}
              onDetail={onDetail}
            />
          ))}

          {/* Placeholder skeletons to fill the grid */}
          {places.length % 3 !== 0 &&
            Array.from({ length: 3 - (places.length % 3) }).map((_, i) => (
              <div
                key={`ph-${i}`}
                className="hidden h-48 rounded-2xl border border-dashed border-slate-200 bg-slate-50 xl:block"
              />
            ))}
        </div>
      )}
    </section>
  );
}