"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardStats } from "./dashboard-stats";
import { DashboardTableView } from "./dashboard-table-view";
import { DashboardGridView } from "./dashboard-grid-view";
import { AdminCrudModal, type CrudModalMode } from "./admin-crud-modal";
import {
  EntityForm,
  apiItemToFormData,
  formDataToPayload,
  type EntityTab,
  type EntityFormData,
} from "./entity-form";
import {
  wisataService,
  hotelService,
  restoranHalalService,
  tokoOlehOlehService,
  fasilitasIbadahService,
  transportasiService,
} from "@/lib/service";
import { useFetch } from "@/hooks/useFetch";

type ViewType = "table" | "grid";

// Normalized data item for table/grid display
type DataItem = {
  id: string;
  name: string;
  city: string;
  category: string;
  rating: string;
  status: string;
};

const entityTabs: { id: EntityTab; label: string; icon: string }[] = [
  { id: "wisata", label: "Wisata", icon: "🗺" },
  { id: "hotel", label: "Hotel", icon: "🏨" },
  { id: "restoran", label: "Restoran", icon: "🍜" },
  { id: "toko", label: "Oleh-oleh", icon: "🎁" },
  { id: "fasilitas", label: "Fasilitas Ibadah", icon: "🕌" },
  { id: "transportasi", label: "Transportasi", icon: "🚄" },
];

// Transform API data into common DataItem format
function transformToDataItems(tab: EntityTab, data: any[]): DataItem[] {
  if (!data) return [];

  switch (tab) {
    case "wisata":
      return data.map((item) => ({
        id: String(item.id),
        name: item.nama_wisata,
        city: item.kota,
        category: item.kategori_wisata,
        rating: "-",
        status: "Aktif",
      }));
    case "hotel":
      return data.map((item) => ({
        id: String(item.id),
        name: item.nama_hotel,
        city: item.kota,
        category: item.tipe_hotel,
        rating: "-",
        status: "Aktif",
      }));
    case "restoran":
      return data.map((item) => ({
        id: String(item.id),
        name: item.nama_resto,
        city: item.kota,
        category: "Kuliner Halal",
        rating: "-",
        status: "Aktif",
      }));
    case "toko":
      return data.map((item) => ({
        id: String(item.id),
        name: item.nama_belanja,
        city: item.kota,
        category: item.jenis_belanja,
        rating: "-",
        status: "Aktif",
      }));
    case "fasilitas":
      return data.map((item) => ({
        id: String(item.id),
        name: item.nama_fas_ibadah,
        city: item.kota,
        category: item.tipe_fas,
        rating: "-",
        status: "Aktif",
      }));
    case "transportasi":
      return data.map((item) => ({
        id: String(item.id),
        name: item.nama_transportasi,
        city: item.rute || "-",
        category: item.jenis_transportasi,
        rating: "-",
        status: "Aktif",
      }));
    default:
      return [];
  }
}

// Pick the right service fetcher
function getFetcher(tab: EntityTab) {
  switch (tab) {
    case "wisata":
      return () => wisataService.getAll();
    case "hotel":
      return () => hotelService.getAll();
    case "restoran":
      return () => restoranHalalService.getAll();
    case "toko":
      return () => tokoOlehOlehService.getAll();
    case "fasilitas":
      return () => fasilitasIbadahService.getAll();
    case "transportasi":
      return () => transportasiService.getAll();
  }
}

// Delete via the right service
async function deleteItem(tab: EntityTab, id: number) {
  switch (tab) {
    case "wisata":
      return wisataService.remove(id);
    case "hotel":
      return hotelService.remove(id);
    case "restoran":
      return restoranHalalService.remove(id);
    case "toko":
      return tokoOlehOlehService.remove(id);
    case "fasilitas":
      return fasilitasIbadahService.remove(id);
    case "transportasi":
      return transportasiService.remove(id);
  }
}

// Create via the right service
async function createItem(tab: EntityTab, payload: any) {
  switch (tab) {
    case "wisata":
      return wisataService.create(payload);
    case "hotel":
      return hotelService.create(payload);
    case "restoran":
      return restoranHalalService.create(payload);
    case "toko":
      return tokoOlehOlehService.create(payload);
    case "fasilitas":
      return fasilitasIbadahService.create(payload);
    case "transportasi":
      return transportasiService.create(payload);
  }
}

// Update via the right service
async function updateItem(tab: EntityTab, id: number, payload: any) {
  switch (tab) {
    case "wisata":
      return wisataService.update(id, payload);
    case "hotel":
      return hotelService.update(id, payload);
    case "restoran":
      return restoranHalalService.update(id, payload);
    case "toko":
      return tokoOlehOlehService.update(id, payload);
    case "fasilitas":
      return fasilitasIbadahService.update(id, payload);
    case "transportasi":
      return transportasiService.update(id, payload);
  }
}

export function AdminDashboardContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<EntityTab>("wisata");
  const [viewType, setViewType] = useState<ViewType>("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<CrudModalMode>("create");
  const [editId, setEditId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<EntityFormData | undefined>();

  // Auth guard — redirect if no token
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/admin");
    }
  }, [router]);

  // Fetch data for active tab
  const { data: rawData, loading, error, refetch } = useFetch(
    () => getFetcher(activeTab)() as Promise<any>,
    [activeTab]
  );

  const rawList: any[] = (rawData as any[]) || [];
  const currentData = transformToDataItems(activeTab, rawList);

  const tabLabel = entityTabs.find((t) => t.id === activeTab)?.label ?? "";

  // ─── Modal handlers ────────────────────────────────────────────────────────

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditId(null);
    setEditFormData(undefined);
    setModalOpen(true);
  };

  const handleOpenEditModal = (itemId: string) => {
    const rawItem = rawList.find((d: any) => String(d.id) === itemId);
    if (rawItem) {
      setModalMode("edit");
      setEditId(Number(itemId));
      setEditFormData(apiItemToFormData(activeTab, rawItem));
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditId(null);
    setEditFormData(undefined);
  };

  const handleSubmitForm = async (data: EntityFormData) => {
    const payload = formDataToPayload(activeTab, data);

    try {
      if (modalMode === "create") {
        await createItem(activeTab, payload);
      } else if (editId !== null) {
        await updateItem(activeTab, editId, payload);
      }
      handleCloseModal();
      refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan data");
    }
  };

  // ─── Delete handler ────────────────────────────────────────────────────────

  const handleDelete = useCallback(
    async (itemId: string) => {
      if (!confirm("Yakin ingin menghapus data ini?")) return;
      try {
        await deleteItem(activeTab, Number(itemId));
        refetch();
      } catch (err) {
        alert(err instanceof Error ? err.message : "Gagal menghapus data");
      }
    },
    [activeTab, refetch]
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <DashboardStats
          counts={{
            total: currentData.length,
          }}
          loading={loading}
        />

        {/* Entity Tab Bar */}
        <div className="flex gap-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1 sm:gap-3 sm:p-2">
          {entityTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:py-2.5 ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Daftar {tabLabel}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading ? "Memuat..." : `${currentData.length} data ditemukan`}
            </p>
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

        {/* Loading skeleton */}
        {loading ? (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-4 w-1/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-1/6 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-1/6 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-1/12 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-200 bg-red-50 py-12 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="mt-3 text-sm font-medium text-red-600">Gagal memuat data</p>
            <p className="mt-1 text-xs text-red-400">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600"
            >
              Coba Lagi
            </button>
          </div>
        ) : viewType === "table" ? (
          <DashboardTableView data={currentData} onEdit={handleOpenEditModal} onDelete={handleDelete} />
        ) : (
          <DashboardGridView data={currentData} onEdit={handleOpenEditModal} onDelete={handleDelete} />
        )}
      </div>

      {/* CRUD Modal */}
      <AdminCrudModal
        isOpen={modalOpen}
        mode={modalMode}
        title={modalMode === "create" ? `Tambah ${tabLabel} Baru` : `Edit ${tabLabel}`}
        subtitle={modalMode === "create" ? `Isi form di bawah untuk menambah ${tabLabel.toLowerCase()} baru` : `Perbarui informasi ${tabLabel.toLowerCase()}`}
        onClose={handleCloseModal}
      >
        <EntityForm
          key={`${activeTab}-${modalMode}-${editId ?? "new"}`}
          entityTab={activeTab}
          mode={modalMode}
          initialData={editFormData}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseModal}
        />
      </AdminCrudModal>
    </>
  );
}
