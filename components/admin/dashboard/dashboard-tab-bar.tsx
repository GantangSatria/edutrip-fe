type CityTab = "tokyo" | "osaka" | "kyoto";

type DashboardTabBarProps = {
  activeCity: CityTab;
  onCityChange: (city: CityTab) => void;
};

const cities: { id: CityTab; label: string; flag: string }[] = [
  { id: "tokyo", label: "Tokyo", flag: "🗼" },
  { id: "osaka", label: "Osaka", flag: "🎪" },
  { id: "kyoto", label: "Kyoto", flag: "⛩️" },
];

export function DashboardTabBar({ activeCity, onCityChange }: DashboardTabBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1 sm:gap-3 sm:p-2">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => onCityChange(city.id)}
          className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:py-2.5 ${
            activeCity === city.id
              ? "bg-primary/10 text-primary shadow-sm"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <span className="mr-1.5">{city.flag}</span>
          {city.label}
        </button>
      ))}
    </div>
  );
}
