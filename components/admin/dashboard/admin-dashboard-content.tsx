"use client";

import { useState } from "react";
import { DashboardTabBar } from "./dashboard-tab-bar";
import { DashboardStats } from "./dashboard-stats";
import { DashboardTableView } from "./dashboard-table-view";
import { DashboardGridView } from "./dashboard-grid-view";
import { AdminCrudModal, type CrudModalMode } from "./admin-crud-modal";
import { DestinationForm, type DestinationFormData } from "./destination-form";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<CrudModalMode>("create");
  const [selectedItem, setSelectedItem] = useState<DestinationFormData | undefined>();

  const currentData = mockData[activeCity];

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedItem(undefined);
    setModalOpen(true);
  };

  const handleOpenEditModal = (itemId: string) => {
    const item = currentData.find((d) => d.id === itemId);
    if (item) {
      setModalMode("edit");
      setSelectedItem({
        id: item.id,
        nama: item.name,
        kota: item.city,
        kategori: item.category,
        harga: "0",
        deskripsi: "",
        khususan: "",
        jalurAkses: "",
      });
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleSubmitForm = async (data: DestinationFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log(`${modalMode === "create" ? "Created" : "Updated"} destination:`, data);
    // Wire to API when ready
    handleCloseModal();
  };

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <DashboardStats />

        <DashboardTabBar activeCity={activeCity} onCityChange={setActiveCity} />

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Daftar Universitas - {activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{currentData.length} data ditemukan</p>
          </div>

          <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row sm:items-center">
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

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark active:scale-95 w-full sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Tambah Data</span>
            </button>
          </div>
        </div>

        {viewType === "table" ? (
          <DashboardTableView data={currentData} onEdit={handleOpenEditModal} />
        ) : (
          <DashboardGridView data={currentData} onEdit={handleOpenEditModal} />
        )}
      </div>

      {/* CRUD Modal */}
      <AdminCrudModal
        isOpen={modalOpen}
        mode={modalMode}
        title={modalMode === "create" ? "Tambah Destinasi Baru" : "Edit Destinasi"}
        subtitle={modalMode === "create" ? "Isi form di bawah untuk menambah destinasi baru" : "Perbarui informasi destinasi"}
        onClose={handleCloseModal}
      >
        <DestinationForm
          mode={modalMode}
          initialData={selectedItem}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseModal}
        />
      </AdminCrudModal>
    </>
  );
}
