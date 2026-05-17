export type PlanCategory = {
  id: string;
  label: string;
  icon: string;
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