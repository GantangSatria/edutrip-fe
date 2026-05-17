"use client";

import { useState, useMemo, useCallback } from "react";

import { PlanHeader } from "@/components/plan/plan-header";
import { PlanFilters } from "@/components/plan/plan-filters";
import { CategorySidebar } from "@/components/plan/category-sidebar";
import { PlacesGrid } from "@/components/plan/places-grid";
import { PlanSummaryBar } from "@/components/plan/plan-summary-bar";
import { TermsModal } from "@/components/plan/terms-modal";
import { PlaceDetailModal } from "@/components/plan/place-detail-modal";
import { CartDetailModal } from "@/components/plan/cart-detail-modal";

import { openWhatsApp } from "@/lib/open-wa";
import { calculateGrandTotal, buildWhatsAppUrl } from "@/lib/plan-calculator";
import { getImageUrl } from "@/lib/image";
import { planService } from "@/lib/service";
import { useFetch } from "@/hooks/useFetch";

import {
  planCategories,
  MASTER_RATES,
} from "@/data/plan";

import type { PlanFiltersState, PlanPlace, PlanTag } from "@/types/plan";
import type { PlanData } from "@/types/planData";
import type { Wisata } from "@/types/wisata";
import type { Hotel } from "@/types/hotel";
import type { RestoranHalal } from "@/types/restoranHalal";
import type { TokoOlehOleh } from "@/types/tokoOlehOleh";
import type { FasilitasIbadah } from "@/types/fasilitasIbadah";

// Transform API data into PlanPlace format
function transformApiDataToPlaces(apiData: PlanData): PlanPlace[] {
  const places: PlanPlace[] = [];

  // Transform wisata
  apiData.wisata?.forEach((item: Wisata) => {
    places.push({
      id: `wisata-${item.id}`,
      title: item.nama_wisata,
      subtitle: item.ket_wisata,
      area: item.kota,
      badge: item.kategori_wisata,
      image: getImageUrl(item.foto, "wisata"),
      rating: null,
      price: item.tiket_wisata,
      selected: false,
      categoryId: "wisata",
    });
  });

  // Transform hotel
  apiData.hotel?.forEach((item: Hotel) => {
    places.push({
      id: `hotel-${item.id}`,
      title: item.nama_hotel,
      subtitle: item.ket_hotel,
      area: item.kota,
      badge: item.tipe_hotel,
      image: getImageUrl(item.foto, "hotel"),
      rating: null,
      price: item.harga_hotel,
      selected: false,
      categoryId: "hotel",
    });
  });

  // Transform restoran
  apiData.restoran?.forEach((item: RestoranHalal) => {
    places.push({
      id: `restoran-${item.id}`,
      title: item.nama_resto,
      subtitle: item.ket_resto,
      area: item.kota,
      badge: "Kuliner Halal",
      image: getImageUrl(item.foto, "restoran"),
      rating: null,
      price: 0, // Restoran doesn't have price in API response
      selected: false,
      categoryId: "kuliner",
    });
  });

  // Transform toko oleh-oleh
  apiData.toko_oleh_oleh?.forEach((item: TokoOlehOleh) => {
    places.push({
      id: `oleh-${item.id}`,
      title: item.nama_belanja,
      subtitle: item.ket_belanja,
      area: item.kota,
      badge: item.jenis_belanja,
      image: getImageUrl(item.foto, "toko"),
      rating: null,
      price: 0, // Toko doesn't have price
      selected: false,
      categoryId: "oleh",
    });
  });

  // Transform fasilitas ibadah
  apiData.fasilitas_ibadah?.forEach((item: FasilitasIbadah) => {
    places.push({
      id: `fasilitas-${item.id}`,
      title: item.nama_fas_ibadah,
      subtitle: item.lokasi_fas_ibadah,
      area: item.kota,
      badge: item.tipe_fas,
      image: getImageUrl(item.foto, "fasilitas"),
      rating: null,
      price: 0, // Fasilitas ibadah is free
      selected: false,
      categoryId: "fasilitas",
    });
  });

  return places;
}

export default function PlanPage() {
  const [showTerms, setShowTerms] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailPlaceId, setDetailPlaceId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState<PlanFiltersState>({
    departure: "",
    destination: "",
    days: 7,
    people: 2,
    activeTags: [],
    activeCategory: "all",
  });

  // Fetch plan data from API
  const { data: apiData, loading, error } = useFetch(() => planService.getAll());

  // Interactive state — selection & tag toggling
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTagIds, setActiveTagIds] = useState<Set<string> | null>(null);

  // Derive places from API data + selection state
  const places: PlanPlace[] = useMemo(() => {
    if (!apiData) return [];
    return transformApiDataToPlaces(apiData).map((p) => ({
      ...p,
      selected: selectedIds.has(p.id),
    }));
  }, [apiData, selectedIds]);

  // Derive tags (cities) from API data + tag active state
  const tags: PlanTag[] = useMemo(() => {
    if (!apiData) return [];
    const citiesSet = new Set<string>();
    const allItems = [
      ...(apiData.wisata || []),
      ...(apiData.hotel || []),
      ...(apiData.restoran || []),
      ...(apiData.toko_oleh_oleh || []),
      ...(apiData.fasilitas_ibadah || []),
    ];
    for (const item of allItems) {
      if (item.kota) citiesSet.add(item.kota);
    }
    return Array.from(citiesSet).map((city, idx) => ({
      id: city.toLowerCase(),
      label: city,
      // Default first 2 cities active; after user clicks, use activeTagIds
      active: activeTagIds !== null
        ? activeTagIds.has(city.toLowerCase())
        : idx < 2,
    }));
  }, [apiData, activeTagIds]);

  // ─── Derived state ──────────────────────────────────────────────────────────

  const activeTags = useMemo(
    () => tags.filter((t) => t.active).map((t) => t.id),
    [tags]
  );

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.categoryId === activeCategory;
      const matchesCity =
        activeTags.length === 0 ||
        activeTags.some((tagId) => p.area.toLowerCase().includes(tagId));
      return matchesCategory && matchesCity;
    });
  }, [places, activeCategory, activeTags]);

  const selectedPlaces = useMemo(
    () => places.filter((p) => p.selected),
    [places]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: places.length };
    for (const p of places) {
      counts[p.categoryId] = (counts[p.categoryId] ?? 0) + 1;
    }
    return counts;
  }, [places]);

  const activeCities = useMemo(
    () => tags.filter((t) => t.active).map((t) => t.label),
    [tags]
  );

  const cartCityLabel = useMemo(
    () => (activeCities.length > 0 ? activeCities.join(" & ") : "Belum dipilih"),
    [activeCities]
  );

  const detailPlace = useMemo(
    () => (detailPlaceId ? places.find((p) => p.id === detailPlaceId) ?? null : null),
    [places, detailPlaceId]
  );

  const detailCategory = useMemo(
    () => (detailPlace ? planCategories.find((c) => c.id === detailPlace.categoryId) ?? null : null),
    [detailPlace]
  );

  // ─── Grand total (IDR) ──────────────────────────────────────────────────────

  const { grandTotal } = useMemo(
    () =>
        calculateGrandTotal({
          people: filters.people,
          days: filters.days,
          hotelRatePerNight: MASTER_RATES.hotelRatePerNight,
          transportRatePerDay: MASTER_RATES.transportRatePerDay,
          totalDestinationTickets: selectedPlaces.reduce((s, p) => s + p.price, 0),
          restaurantCount: selectedPlaces.filter((p) => p.categoryId === "restoran").length,
          avgMealRate: MASTER_RATES.avgMealRate,
          flightPricePerPerson: MASTER_RATES.flightPricePerPerson,
        }),
      [filters.people, filters.days, selectedPlaces]
    );

    // ─── WA redirect ────────────────────────────────────────────────────────────

const handleOpenWhatsApp = useCallback(() => {
  
  const destinasi = selectedPlaces
    .filter((p) => p.categoryId === "destinasi")
    .map((p) => p.title);

  const restoran = selectedPlaces
    .filter((p) => p.categoryId === "restoran")
    .map((p) => p.title);

  const url = buildWhatsAppUrl({
    cities: activeCities,
    departureDate: filters.departure || "Belum ditentukan",
    days: filters.days,
    people: filters.people,
    destinations: destinasi,
    restaurants: restoran,
    grandTotal,
  });

  openWhatsApp(url);
}, [activeCities, filters.departure, filters.days, filters.people, selectedPlaces, grandTotal]);
  
  const handleTermsAccept = handleOpenWhatsApp;
  
  // Tombol konsultasi → buka Terms dulu
  const handleConsultClick = useCallback(() => {
    setCartOpen(false);
    setShowTerms(true);
  }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleTogglePlace = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleTagToggle = useCallback((id: string) => {
    setActiveTagIds((prev) => {
      // On first user interaction, initialize from current defaults
      const current = prev !== null ? new Set(prev) : new Set(tags.filter((t) => t.active).map((t) => t.id));
      if (current.has(id)) current.delete(id);
      else current.add(id);
      return current;
    });
  }, [tags]);

  const handleFilterChange = useCallback(
    (key: keyof PlanFiltersState, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleDetail = useCallback((id: string) => setDetailPlaceId(id), []);
  const handleCloseDetail = useCallback(() => setDetailPlaceId(null), []);
  const handleOpenCart = useCallback(() => setCartOpen(true), []);
  const handleCloseCart = useCallback(() => setCartOpen(false), []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-slate-100">
      <PlanHeader
        cartCount={selectedPlaces.length}
        onBack={() => history.back()}
        onCart={handleOpenCart}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <PlanFilters
          filters={filters}
          tags={tags}
          onTagToggle={handleTagToggle}
          onFilterChange={handleFilterChange}
        />

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <CategorySidebar
            categories={planCategories}
            activeId={activeCategory}
            counts={categoryCounts}
            onSelect={setActiveCategory}
          />

          {/* Loading state */}
          {loading ? (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  <span className="inline-block h-3 w-20 animate-pulse rounded bg-slate-200" />
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`skel-${i}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="h-36 animate-pulse bg-slate-100 sm:h-40" />
                    <div className="space-y-2 p-3">
                      <div className="h-2.5 w-1/3 animate-pulse rounded bg-slate-100" />
                      <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-100" />
                      <div className="h-2.5 w-full animate-pulse rounded bg-slate-100" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-8 flex-1 animate-pulse rounded-xl bg-slate-100" />
                        <div className="h-8 flex-1 animate-pulse rounded-xl bg-slate-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : error ? (
            /* Error state */
            <section>
              <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 py-16 text-center">
                <span className="text-3xl">⚠️</span>
                <p className="mt-3 text-sm font-medium text-red-600">Gagal memuat data</p>
                <p className="mt-1 text-xs text-red-400">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Coba Lagi
                </button>
              </div>
            </section>
          ) : (
            <PlacesGrid
              places={filteredPlaces}
              onToggle={handleTogglePlace}
              onDetail={handleDetail}
            />
          )}
        </div>
      </div>

      <PlanSummaryBar
        selectedCount={selectedPlaces.length}
        grandTotal={grandTotal}
        people={filters.people}
        cities={activeCities}
        onOpenCart={handleOpenCart}
        onConsult={handleConsultClick}
      />

      <TermsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={handleTermsAccept}
      />

      <PlaceDetailModal
        place={detailPlace}
        categoryLabel={detailCategory?.label ?? detailPlace?.badge ?? ""}
        categoryIcon={detailCategory?.icon ?? "📍"}
        onClose={handleCloseDetail}
        onToggleCart={handleTogglePlace}
      />

      <CartDetailModal
        open={cartOpen}
        onClose={handleCloseCart}
        selectedPlaces={selectedPlaces}
        categories={planCategories}
        people={filters.people}
        days={filters.days}
        cityLabel={cartCityLabel}
        grandTotal={grandTotal}
        onRemoveItem={handleTogglePlace}
        onAddMore={handleCloseCart}
        onConsultWa={handleConsultClick}
      />
    </main>
  );
}