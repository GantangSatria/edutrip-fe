import type { City, Destination, Testimonial } from "@/types/travel";

export const cityCards: City[] = [
  {
    name: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Osaka",
    image:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
  },
];

export const destinations: Destination[] = [
  {
    name: "Asakusa",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
    price: 20,
  },
  {
    name: "Sensoji",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    price: 30,
  },
  {
    name: "Tokyo Tower",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
    price: 40,
  },
  {
    name: "Shibuya",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1200&q=80",
    price: 50,
  },
  {
    name: "Skytree",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1533055640609-24b498cdfd89?auto=format&fit=crop&w=1200&q=80",
    price: 60,
  },
  {
    name: "Ueno Park",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=1200&q=80",
    price: 10,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Aulia M.",
    quote:
      "Trip ke Jepang jadi tenang karena itinerary dan rekomendasinya ramah muslim banget.",
  },
  {
    name: "Rizky F.",
    quote:
      "Booking gampang, tampilannya jelas, dan pilihan destinasi premium-nya banyak.",
  },
  {
    name: "Nadya S.",
    quote:
      "Edutrip bantu pilih makanan halal dan tempat shalat, jadi perjalanan lebih nyaman.",
  },
];