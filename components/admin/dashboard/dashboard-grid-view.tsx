import { DashboardActionButtons } from "./dashboard-action-buttons";

type DataItem = {
  id: string;
  name: string;
  city: string;
  category: string;
  rating: string;
  status: string;
};

type DashboardGridViewProps = {
  data: DataItem[];
  onEdit?: (itemId: string) => void;
};

export function DashboardGridView({ data, onEdit }: DashboardGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.length === 0 ? (
        <div className="col-span-full py-12 text-center">
          <p className="text-sm text-slate-500">Tidak ada data</p>
        </div>
      ) : (
        data.map((item) => (
          <article
            key={item.id}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="truncate text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.city}</p>
              </div>
              <span className={`ml-2 flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${
                item.status === "Aktif"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-700"
              }`}>
                {item.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {item.category}
              </span>
              <span className="font-semibold text-amber-600">⭐ {item.rating}</span>
            </div>

            <div className="mt-4 flex gap-2 pt-4 border-t border-slate-200">
              <DashboardActionButtons itemId={item.id} layout="vertical" onEdit={onEdit} />
            </div>
          </article>
        ))
      )}
    </div>
  );
}
