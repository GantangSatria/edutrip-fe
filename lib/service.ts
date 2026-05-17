import api from "./api";
import type {ApiResponse} from "../types/api";
import type { AuthData, LoginPayload } from "@/types/auth";
import type { FasilitasIbadah, FasilitasIbadahPayload } from "@/types/fasilitasIbadah";
import type { Hotel, HotelPayload } from "@/types/hotel";
import type { RestoranHalal, RestoranHalalPayload } from "@/types/restoranHalal";
import type { TokoOlehOleh, TokoOlehOlehPayload } from "@/types/tokoOlehOleh";
import type { Transportasi, TransportasiPayload } from "@/types/transportasi";
import type { Wisata, WisataPayload } from "@/types/wisata";
import type { PlanData } from "@/types/planData";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<ApiResponse<AuthData>>("/auth/login", payload).then((r) => r.data),
};

// ─── Hotel ────────────────────────────────────────────────────────────────────

export const hotelService = {
  getAll: (params?: { kota?: string; tipe?: string }) =>
    api.get<ApiResponse<Hotel[]>>("/hotel", { params }).then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<Hotel>>(`/hotel/${id}`).then((r) => r.data),

  create: (payload: HotelPayload) =>
    api.post<ApiResponse<Hotel>>("/admin/hotel", payload).then((r) => r.data),

  update: (id: number, payload: Partial<HotelPayload>) =>
    api.put<ApiResponse<Hotel>>(`/admin/hotel/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<ApiResponse<null>>(`/admin/hotel/${id}`).then((r) => r.data),
};

// ─── Wisata ───────────────────────────────────────────────────────────────────

export const wisataService = {
  getAll: (params?: { kota?: string; kategori?: string }) =>
    api.get<ApiResponse<Wisata[]>>("/wisata", { params }).then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<Wisata>>(`/wisata/${id}`).then((r) => r.data),

  create: (payload: WisataPayload) =>
    api.post<ApiResponse<Wisata>>("/admin/wisata", payload).then((r) => r.data),

  update: (id: number, payload: Partial<WisataPayload>) =>
    api.put<ApiResponse<Wisata>>(`/admin/wisata/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<ApiResponse<null>>(`/admin/wisata/${id}`).then((r) => r.data),
};

// ─── Restoran Halal ───────────────────────────────────────────────────────────

export const restoranHalalService = {
  getAll: (params?: { kota?: string }) =>
    api.get<ApiResponse<RestoranHalal[]>>("/restoran-halal", { params }).then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<RestoranHalal>>(`/restoran-halal/${id}`).then((r) => r.data),

  create: (payload: RestoranHalalPayload) =>
    api.post<ApiResponse<RestoranHalal>>("/admin/restoran-halal", payload).then((r) => r.data),

  update: (id: number, payload: Partial<RestoranHalalPayload>) =>
    api.put<ApiResponse<RestoranHalal>>(`/admin/restoran-halal/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<ApiResponse<null>>(`/admin/restoran-halal/${id}`).then((r) => r.data),
};

// ─── Toko Oleh-Oleh ───────────────────────────────────────────────────────────

export const tokoOlehOlehService = {
  getAll: (params?: { kota?: string }) =>
    api.get<ApiResponse<TokoOlehOleh[]>>("/toko-oleh-oleh", { params }).then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<TokoOlehOleh>>(`/toko-oleh-oleh/${id}`).then((r) => r.data),

  create: (payload: TokoOlehOlehPayload) =>
    api.post<ApiResponse<TokoOlehOleh>>("/admin/toko-oleh-oleh", payload).then((r) => r.data),

  update: (id: number, payload: Partial<TokoOlehOlehPayload>) =>
    api.put<ApiResponse<TokoOlehOleh>>(`/admin/toko-oleh-oleh/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<ApiResponse<null>>(`/admin/toko-oleh-oleh/${id}`).then((r) => r.data),
};

// ─── Fasilitas Ibadah ─────────────────────────────────────────────────────────

export const fasilitasIbadahService = {
  getAll: (params?: { kota?: string }) =>
    api.get<ApiResponse<FasilitasIbadah[]>>("/fasilitas-ibadah", { params }).then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<FasilitasIbadah>>(`/fasilitas-ibadah/${id}`).then((r) => r.data),

  create: (payload: FasilitasIbadahPayload) =>
    api.post<ApiResponse<FasilitasIbadah>>("/admin/fasilitas-ibadah", payload).then((r) => r.data),

  update: (id: number, payload: Partial<FasilitasIbadahPayload>) =>
    api.put<ApiResponse<FasilitasIbadah>>(`/admin/fasilitas-ibadah/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<ApiResponse<null>>(`/admin/fasilitas-ibadah/${id}`).then((r) => r.data),
};

// ─── Transportasi ─────────────────────────────────────────────────────────────

export const transportasiService = {
  getAll: (params?: { rute?: string }) =>
    api.get<ApiResponse<Transportasi[]>>("/transportasi", { params }).then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<Transportasi>>(`/transportasi/${id}`).then((r) => r.data),

  create: (payload: TransportasiPayload) =>
    api.post<ApiResponse<Transportasi>>("/admin/transportasi", payload).then((r) => r.data),

  update: (id: number, payload: Partial<TransportasiPayload>) =>
    api.put<ApiResponse<Transportasi>>(`/admin/transportasi/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<ApiResponse<null>>(`/admin/transportasi/${id}`).then((r) => r.data),
};

// plan data
export const planService = {
  getAll: () =>
    api.get<ApiResponse<PlanData>>("/plan-data").then((r) => r.data),
};