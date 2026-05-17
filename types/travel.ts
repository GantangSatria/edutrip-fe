export type CityFeatureId = "building" | "mosque" | "graduation" | "utensils";

export type CityFeature = {
  id: CityFeatureId;
  text: string;
};

export type City = {
  name: string;
  image: string;
  description: string;
  halalSpotsValue: string;
  halalSpotsLabel: string;
  mainMosqueTitle: string;
  mainMosqueSubtitle: string;
  features: CityFeature[];
  terrainLead: string;
  terrainRest: string;
};

export type Destination = {
  name: string;
  location: string;
  image: string;
  price: number;
};

export type Testimonial = {
  name: string;
  quote: string;
};