import type { PlanCategory, PlanPlace, PlanTag } from "@/types/plan";

export const planCategories: PlanCategory[] = [
  { id: "all", label: "Semua", icon: "◈" },
  { id: "wisata", label: "Wisata", icon: "🗺" },
  { id: "kuliner", label: "Kuliner Halal", icon: "🍜" },
  { id: "hotel", label: "Hotel", icon: "🏨" },
  { id: "fasilitas", label: "Fasilitas Ibadah", icon: "🕌" },
  { id: "oleh", label: "Oleh-oleh", icon: "🎁" },
];

export const planTags: PlanTag[] = [
  { id: "tokyo", label: "Tokyo", active: true },
  { id: "osaka", label: "Osaka", active: true },
  { id: "kyoto", label: "Kyoto", active: false },
  { id: "hiroshima", label: "Hiroshima", active: false },
  { id: "nara", label: "Nara", active: false },
];

export const MASTER_RATES = {
  hotelRatePerNight: 1_200_000,
  transportRatePerDay: 350_000,
  avgMealRate: 200_000,
  flightPricePerPerson: 8_500_000,
} as const;

export const planPlaces: PlanPlace[] = [
  {
    id: "p1",
    title: "Senso-ji Temple",
    subtitle: "Kuil Buddha tertua di Tokyo, ikonik & wajib kunjung",
    area: "Asakusa, Tokyo",
    badge: "Wisata",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: 0,
    selected: true,
    categoryId: "wisata",
  },
  {
    id: "p2",
    title: "Tokyo Skytree",
    subtitle: "Menara tertinggi di Jepang, view 360° kota Tokyo",
    area: "Sumida, Tokyo",
    badge: "Wisata",
    image:
      "https://images.unsplash.com/photo-1533055640609-24b498cdfd89?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: 22,
    selected: false,
    categoryId: "wisata",
  },
  {
    id: "p3",
    title: "Shibuya Crossing",
    subtitle: "Perempatan paling ramai di dunia, ikon modern Tokyo",
    area: "Shibuya, Tokyo",
    badge: "Wisata",
    image:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    price: 0,
    selected: true,
    categoryId: "wisata",
  },
  {
    id: "p4",
    title: "Halal Ramen Naritake",
    subtitle: "Ramen halal certified, kuah tonkotsu kaya rasa",
    area: "Shinjuku, Tokyo",
    badge: "Kuliner",
    image:
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    price: 12,
    selected: false,
    categoryId: "kuliner",
  },
  {
    id: "p5",
    title: "Ueno Park & Zoo",
    subtitle: "Taman luas dengan danau, museum, dan kebun binatang",
    area: "Ueno, Tokyo",
    badge: "Wisata",
    image:
      "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    price: 8,
    selected: false,
    categoryId: "wisata",
  },
  {
    id: "p6",
    title: "Hotel Shinjuku Granbell",
    subtitle: "Hotel modern, dekat stasiun, halal-friendly breakfast",
    area: "Shinjuku, Tokyo",
    badge: "Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    price: 1660000  ,
    selected: false,
    categoryId: "hotel",
  },
  {
    id: "p7",
    title: "Osaka Castle",
    subtitle: "Kastil bersejarah dengan taman sakura yang indah",
    area: "Chuo, Osaka",
    badge: "Wisata",
    image:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: 5,
    selected: false,
    categoryId: "wisata",
  },
  {
    id: "p8",
    title: "Dotonbori Street Food",
    subtitle: "Surga kuliner Osaka, takoyaki & okonomiyaki halal",
    area: "Namba, Osaka",
    badge: "Kuliner",
    image:
      "https://images.unsplash.com/photo-1620360289297-c05f76257d2a?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: 15,
    selected: false,
    categoryId: "kuliner",
  },
  {
    id: "p9",
    title: "JR Pass 7 Hari",
    subtitle: "Unlimited shinkansen & kereta JR seluruh Jepang",
    area: "Seluruh Jepang",
    badge: "Transport",
    image:
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=800&q=80",
    rating: null,
    price: 290,
    selected: false,
    categoryId: "transport",
  },
];

export const departureAirports = [
  { value: "", label: "Pilih Bandara" },
  { value: "CGK", label: "Soekarno-Hatta (CGK)" },
  { value: "SUB", label: "Juanda (SUB)" },
  { value: "DPS", label: "Ngurah Rai (DPS)" },
  { value: "UPG", label: "Makassar (UPG)" },
];

export const destinationAirports = [
  { value: "", label: "Pilih Bandara" },
  { value: "NRT", label: "Narita (NRT)" },
  { value: "HND", label: "Haneda (HND)" },
  { value: "KIX", label: "Kansai (KIX)" },
  { value: "ITM", label: "Osaka Itami (ITM)" },
];