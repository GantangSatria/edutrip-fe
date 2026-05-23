export type Kota = {
  id: number;
  name: string;
  image?: string;
  description?: string;
  halal_spots_value?: string;
  halal_spots_label?: string;
  main_mosque_title?: string;
  main_mosque_subtitle?: string;
  features?: string;
  terrain_lead?: string;
  terrain_rest?: string;
  created_at?: string;
};

export type KotaPayload = {
  name: string;
  image?: string;
  description?: string;
  halal_spots_value?: string;
  halal_spots_label?: string;
  main_mosque_title?: string;
  main_mosque_subtitle?: string;
  features?: string;
  terrain_lead?: string;
  terrain_rest?: string;
};
