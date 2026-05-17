import type { PlanFiltersState, PlanTag } from "@/types/plan";
import { departureAirports, destinationAirports } from "@/data/plan";

type PlanFiltersProps = {
  filters: PlanFiltersState;
  tags: PlanTag[];
  onTagToggle: (id: string) => void;
  onFilterChange: (key: keyof PlanFiltersState, value: string | number) => void;
};

const selectClass =
  "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none ring-0 transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm";

type CounterProps = {
  value: number;
  min?: number;
  max?: number;
  unit: string;
  onDecrement: () => void;
  onIncrement: () => void;
};

function Counter({ value, min = 1, max = 30, unit, onDecrement, onIncrement }: CounterProps) {
  return (
    <div className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-sm transition hover:bg-slate-100 disabled:opacity-40"
      >
        -
      </button>
      <span className="min-w-6 text-center text-sm font-semibold text-slate-800">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-sm transition hover:bg-slate-100 disabled:opacity-40"
      >
        +
      </button>
      <span className="ml-auto text-[0.65rem] text-slate-400 sm:text-xs">{unit}</span>
    </div>
  );
}

export function PlanFilters({ filters, tags, onTagToggle, onFilterChange }: PlanFiltersProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* City tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.65rem] font-medium text-slate-400 sm:text-xs">Kota:</span>
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => onTagToggle(tag.id)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-semibold transition-all duration-200 active:scale-95 sm:text-xs ${
              tag.active
                ? "bg-primary text-white shadow-sm shadow-primary/30 hover:bg-primary-dark"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            {tag.active && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {tag.label}
          </button>
        ))}
      </div>

      {/* Filter controls */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-[0.65rem] font-medium text-slate-500 sm:text-xs">
            Berangkat dari
          </label>
          <select
            className={selectClass}
            value={filters.departure}
            onChange={(e) => onFilterChange("departure", e.target.value)}
          >
            {departureAirports.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[0.65rem] font-medium text-slate-500 sm:text-xs">
            Tujuan ke
          </label>
          <select
            className={selectClass}
            value={filters.destination}
            onChange={(e) => onFilterChange("destination", e.target.value)}
          >
            {destinationAirports.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[0.65rem] font-medium text-slate-500 sm:text-xs">
            Durasi perjalanan
          </label>
          <Counter
            value={filters.days}
            min={1}
            max={30}
            unit="hari"
            onDecrement={() => onFilterChange("days", Math.max(1, filters.days - 1))}
            onIncrement={() => onFilterChange("days", Math.min(30, filters.days + 1))}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[0.65rem] font-medium text-slate-500 sm:text-xs">
            Jumlah orang
          </label>
          <Counter
            value={filters.people}
            min={1}
            max={20}
            unit="orang"
            onDecrement={() => onFilterChange("people", Math.max(1, filters.people - 1))}
            onIncrement={() => onFilterChange("people", Math.min(20, filters.people + 1))}
          />
        </div>
      </div>
    </section>
  );
}