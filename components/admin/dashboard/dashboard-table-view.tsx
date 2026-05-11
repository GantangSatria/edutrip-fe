import { DashboardActionButtons } from "./dashboard-action-buttons";

type DataItem = {
  id: string;
  name: string;
  city: string;
  category: string;
  rating: string;
  status: string;
};

type DashboardTableViewProps = {
  data: DataItem[];
  onEdit?: (itemId: string) => void;
};

export function DashboardTableView({ data, onEdit }: DashboardTableViewProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="space-y-3 p-4 sm:hidden">
        {data.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">Tidak ada data</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{item.city}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  item.status === "Aktif"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-700"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">{item.category}</span>
                <span className="font-semibold text-amber-600">⭐ {item.rating}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <DashboardActionButtons itemId={item.id} onEdit={onEdit} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700 sm:px-6">Nama</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Kota</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Kategori</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">Rating</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-slate-200 transition-all hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900 sm:px-6">{item.name}</td>
                  <td className="px-4 py-4 text-slate-600">{item.city}</td>
                  <td className="px-4 py-4 text-slate-600">{item.category}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-amber-600">⭐ {item.rating}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "Aktif"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <DashboardActionButtons itemId={item.id} onEdit={onEdit} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
