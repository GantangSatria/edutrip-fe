"use client";

import { useState } from "react";
import { DashboardTabBar } from "./dashboard-tab-bar";
import { DashboardStats } from "./dashboard-stats";
import { DashboardTableView } from "./dashboard-table-view";
import { DashboardGridView } from "./dashboard-grid-view";

type ViewType = "table" | "grid";
type CityTab = "tokyo" | "osaka" | "kyoto";

const mockData = {
  tokyo: [
    {
      id: "1",
      name: "University of Tokyo",
      city: "Tokyo",
      category: "Universitas",
      rating: "4.8",
      status: "Aktif",
    },
    {
      id: "2",
      name: "Waseda University",
      city: "Tokyo",
      category: "Universitas",
      rating: "4.6",
      status: "Aktif",
    },
    {
      id: "3",
      name: "Keio University",
      city: "Tokyo",
      category: "Universitas",
      rating: "4.5",
      status: "Aktif",
    },
  ],
  osaka: [
    {
      id: "4",
      name: "Osaka University",
      city: "Osaka",
      category: "Universitas",
      rating: "4.7",
      status: "Aktif",
    },
    {
      id: "5",
      name: "Kobe University",
      city: "Osaka",
      category: "Universitas",
      rating: "4.4",
      status: "Aktif",
    },
  ],
  kyoto: [
    {
      id: "6",
      name: "Kyoto University",
      city: "Kyoto",
      category: "Universitas",
      rating: "4.9",
      status: "Aktif",
    },
  ],
};

export function AdminDashboardContent() {
  const [activeCity, setActiveCity] = useState<CityTab>("tokyo");
  const [viewType, setViewType] = useState<ViewType>("table");

  const currentData = mockData[activeCity];

  return (
    <div className="space-y-6 sm:space-y-8">
      <DashboardStats />

      <DashboardTabBar activeCity={activeCity} onCityChange={setActiveCity} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Daftar Universitas - {activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{currentData.length} data ditemukan</p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
          <button
            onClick={() => setViewType("table")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-all ${
              viewType === "table"
                ? "bg-primary text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tabel
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-all ${
              viewType === "grid"
                ? "bg-primary text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {viewType === "table" ? (
        <DashboardTableView data={currentData} />
      ) : (
        <DashboardGridView data={currentData} />
      )}
    </div>
  );
}
