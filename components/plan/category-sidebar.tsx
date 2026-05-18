import type { PlanCategory } from "@/types/plan";

type CategorySidebarProps = {
  categories: PlanCategory[];
  activeId: string;
  counts: Record<string, number>;
  onSelect: (id: string) => void;
};

export function CategorySidebar({ categories, activeId, counts, onSelect }: CategorySidebarProps) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-24 lg:self-start">
      <h2 className="mb-3 px-1 text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase sm:text-xs">
        Kategori
      </h2>
      <ul className="space-y-0.5">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          const count = counts[cat.id] ?? 0;
          const isSub = !!cat.parentId;

          return (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onSelect(cat.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all duration-150 active:scale-[0.98] ${
                  isSub ? "pl-8" : ""
                } ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className={`flex items-center justify-center rounded-lg text-sm transition-all ${
                  isSub ? "h-6 w-6 text-xs" : "h-7 w-7"
                } ${
                  isActive
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {cat.icon}
                </span>
                <span className={`flex-1 font-medium ${isSub ? "text-[0.7rem] sm:text-xs" : "text-xs sm:text-sm"}`}>
                  {cat.label}
                </span>
                {count > 0 && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold ${
                    isActive ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-500"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}