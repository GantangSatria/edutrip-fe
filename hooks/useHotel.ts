import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { useMutation } from "./useMutation";
import { hotelService } from "@/lib/service";
import type { HotelPayload } from "@/types/hotel";

interface UseHotelsOptions {
  kota?: string;
  tipe?: string;
}

/** Fetch list of hotels, optionally filtered by city / type. */
export function useHotels(options: UseHotelsOptions = {}) {
  return useFetch(
    () => hotelService.getAll(options),
    [options.kota, options.tipe]
  );
}

/** Fetch a single hotel by ID. */
export function useHotel(id: number) {
  return useFetch(() => hotelService.getById(id), [id]);
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Create a new hotel (admin). */
export function useCreateHotel(onSuccess?: () => void) {
  return useMutation(
    useCallback((payload: HotelPayload) => hotelService.create(payload), []),
    { onSuccess }
  );
}

/** Update an existing hotel (admin). */
export function useUpdateHotel(id: number, onSuccess?: () => void) {
  return useMutation(
    useCallback(
      (payload: Partial<HotelPayload>) => hotelService.update(id, payload),
      [id]
    ),
    { onSuccess }
  );
}

/** Delete a hotel (admin). */
export function useDeleteHotel(onSuccess?: () => void) {
  return useMutation(
    useCallback((id: number) => hotelService.remove(id), []),
    { onSuccess }
  );
}