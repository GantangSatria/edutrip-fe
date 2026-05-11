"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

import { PlanHeader } from "@/components/plan/plan-header";
import { PlanFilters } from "@/components/plan/plan-filters";
import { CategorySidebar } from "@/components/plan/category-sidebar";
import { PlacesGrid } from "@/components/plan/places-grid";
import { PlanSummaryBar } from "@/components/plan/plan-summary-bar";
import { TermsModal } from "@/components/plan/terms-modal";
import { PlaceDetailModal } from "@/components/plan/place-detail-modal";
import { CartDetailModal } from "@/components/plan/cart-detail-modal";

import {
  planCategories,
  planTags as initialTags,
  planPlaces as initialPlaces,
} from "@/data/plan";

import type { PlanFiltersState, PlanPlace, PlanTag } from "@/types/plan";

export default function PlanPage() {
  const [showTerms, setShowTerms] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailPlaceId, setDetailPlaceId] = useState<string | null>(null);
  const [places, setPlaces] = useState<PlanPlace[]>(initialPlaces);
  const [tags, setTags] = useState<PlanTag[]>(initialTags);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState<PlanFiltersState>({
    departure: "",
    destination: "",
    days: 7,
    people: 2,
    activeTags: initialTags.filter((t) => t.active).map((t) => t.id),
    activeCategory: "all",
  });

  const activeTags = useMemo(() => tags.filter((t) => t.active).map((t) => t.id), [tags]);

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.categoryId === activeCategory;
      const matchesCity =
        activeTags.length === 0 ||
        activeTags.some((tagId) => p.area.toLowerCase().includes(tagId));
      return matchesCategory && matchesCity;
    });
  }, [places, activeCategory, activeTags]);

  const selectedPlaces = useMemo(() => places.filter((p) => p.selected), [places]);
  const totalUsd = useMemo(
    () => selectedPlaces.reduce((sum, p) => sum + p.price, 0),
    [selectedPlaces]
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

  const detailCategory = useMemo(() => {
    if (!detailPlace) return null;
    return planCategories.find((c) => c.id === detailPlace.categoryId) ?? null;
  }, [detailPlace]);

  useEffect(() => {
    if (detailPlaceId != null && !places.some((p) => p.id === detailPlaceId)) {
      setDetailPlaceId(null);
    }
  }, [detailPlaceId, places]);

  const handleTogglePlace = useCallback((id: string) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  }, []);

  const handleTagToggle = useCallback((id: string) => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  }, []);

  const handleFilterChange = useCallback(
    (key: keyof PlanFiltersState, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleDetail = useCallback((id: string) => {
    setDetailPlaceId(id);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailPlaceId(null);
  }, []);

  const handleOpenCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const handleCartConsult = useCallback(() => {
    setShowTerms(true);
  }, []);

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
          <PlacesGrid
            places={filteredPlaces}
            onToggle={handleTogglePlace}
            onDetail={handleDetail}
          />
        </div>
      </div>

      <PlanSummaryBar
        selectedCount={selectedPlaces.length}
        totalUsd={totalUsd}
        people={filters.people}
        cities={activeCities}
        onOpenCart={handleOpenCart}
        onConsult={() => setShowTerms(true)}
      />

      <TermsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => window.open("https://wa.me/628123456789", "_blank")}
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
        onRemoveItem={handleTogglePlace}
        onAddMore={() => {}}
        onConsultWa={handleCartConsult}
      />
    </main>
  );
}