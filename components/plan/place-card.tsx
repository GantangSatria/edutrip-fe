import { formatIDR } from "@/lib/plan-calculator";
import type { PlanPlace } from "@/types/plan";

type PlaceCardProps = {
  place: PlanPlace;
  onToggle: (id: string) => void;
  onDetail: (id: string) => void;
};

export function PlaceCard({ place, onToggle, onDetail }: PlaceCardProps) {
  const isFree = place.price === 0;
  const priceLabel = isFree ? "Gratis" : formatIDR(place.price);

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        place.selected
          ? "border-primary/40 ring-1 ring-primary/20"
          : "border-slate-200"
      }`}
    >
      {/* Image */}
      <div className="relative h-36 w-full overflow-hidden sm:h-40">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${place.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Badge */}
        <span className="absolute left-2.5 top-2.5 rounded-full bg-slate-900/60 px-2.5 py-0.5 text-[0.6rem] font-semibold text-white backdrop-blur-sm">
          {place.badge}
        </span>

        {/* Selected indicator */}
        {place.selected && (
          <span className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[0.62rem] font-medium text-slate-400 sm:text-[0.68rem]">
          {place.area}
        </p>
        <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-slate-900 sm:text-base">
          {place.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[0.65rem] leading-relaxed text-slate-500 sm:text-xs">
          {place.subtitle}
        </p>

        {/* Rating + Price */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {place.rating !== null ? (
              <>
                <span className="text-xs text-amber-400">★</span>
                <span className="text-[0.65rem] font-semibold text-amber-600 sm:text-xs">
                  {place.rating}
                </span>
              </>
            ) : (
              <span className="text-[0.65rem] text-slate-400">Belum ada rating</span>
            )}
          </div>
          <span
            className={`text-[0.7rem] font-bold sm:text-xs ${
              isFree ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {priceLabel}
            {!isFree && (
              <span className="ml-0.5 font-normal text-slate-400">/orang</span>
            )}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onDetail(place.id)}
            className="flex-1 rounded-xl border border-slate-200 py-1.5 text-[0.68rem] font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] sm:text-xs"
          >
            Detail
          </button>
          <button
            type="button"
            onClick={() => onToggle(place.id)}
            className={`flex-1 rounded-xl py-1.5 text-[0.68rem] font-semibold text-white transition-all active:scale-[0.98] sm:text-xs ${
              place.selected
                ? "bg-primary shadow-sm shadow-primary/30 hover:bg-primary-dark"
                : "bg-slate-700 hover:bg-slate-800"
            }`}
          >
            {place.selected ? "✓ Ditambah" : "+ Tambah"}
          </button>
        </div>
      </div>
    </article>
  );
}