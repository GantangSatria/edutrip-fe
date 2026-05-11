type StatCard = {
  icon: string;
  label: string;
  value: string;
  color: string;
};

const stats: StatCard[] = [
  { icon: "🏫", label: "Total Universitas", value: "6", color: "from-blue-50 to-blue-100" },
  { icon: "👥", label: "User Aktif", value: "1.2K", color: "from-emerald-50 to-emerald-100" },
  { icon: "📍", label: "Destinasi", value: "24", color: "from-amber-50 to-amber-100" },
  { icon: "⭐", label: "Rating Avg", value: "4.6", color: "from-rose-50 to-rose-100" },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-lg bg-gradient-to-br ${stat.color} p-4 sm:p-5`}
        >
          <div className="text-2xl sm:text-3xl">{stat.icon}</div>
          <p className="mt-2 text-[0.7rem] font-medium text-slate-600 sm:text-xs">{stat.label}</p>
          <p className="mt-1 text-lg font-bold text-slate-900 sm:mt-2 sm:text-xl">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
