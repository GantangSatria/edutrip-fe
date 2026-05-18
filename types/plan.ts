export type PlanCategory = {
  id: string;
  label: string;
  icon: string;
  parentId?: string; // for sub-categories under a parent
};

export type PlanPlace = {
  id: string;
  title: string;
  subtitle: string;
  area: string;
  badge: string;
  image: string;
  rating: number | null;
  price: number;
  selected: boolean;
  categoryId: string;
  subCategoryId?: string; // wisata sub-category (kampus, museum, etc.)
};

export type PlanTag = {
  id: string;
  label: string;
  active: boolean;
};

export type PlanFiltersState = {
  departure: string;
  destination: string;
  days: number;
  people: number;
  activeTags: string[];
  activeCategory: string;
};