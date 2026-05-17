const WA_ADMIN_NUMBER = "962795635222";

// Formatter 

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

//  GRAND TOTAL = Penginapan + Transportasi + Tiket Destinasi + Restoran + Pesawat PP
//
//  Penginapan      = hotelRatePerNight  × (days − 1) × people
//  Transportasi    = transportRatePerDay × days       × people
//  Tiket Destinasi = totalDestinationTickets          × people  (sudah dijumlah)
//  Restoran        = restaurantCount × avgMealRate    × people
//  Pesawat PP      = flightPricePerPerson             × people

export type GrandTotalInput = {
  people: number;
  days: number;
  hotelRatePerNight: number;
  transportRatePerDay: number;
  //Jumlah harga tiket semua destinasi yang dipilih — belum × people
  totalDestinationTickets: number;
  restaurantCount: number;
  avgMealRate: number;
  flightPricePerPerson: number;
};

export type GrandTotalResult = {
  akomodasi: number;
  transportasi: number;
  destinasi: number;
  restoran: number;
  pesawat: number;
  grandTotal: number;
};

export function calculateGrandTotal(input: GrandTotalInput): GrandTotalResult {
  const {
    people,
    days,
    hotelRatePerNight,
    transportRatePerDay,
    totalDestinationTickets,
    restaurantCount,
    avgMealRate,
    flightPricePerPerson,
  } = input;

  const nights = Math.max(0, days - 1);

  const akomodasi    = hotelRatePerNight       * nights          * people;
  const transportasi = transportRatePerDay     * days            * people;
  const destinasi    = totalDestinationTickets                   * people;
  const restoran     = restaurantCount         * avgMealRate     * people;
  const pesawat      = flightPricePerPerson                      * people;

  const grandTotal = akomodasi + transportasi + destinasi + restoran + pesawat;

  return { akomodasi, transportasi, destinasi, restoran, pesawat, grandTotal };
}

// WhatsApp URL Builder

export type WaMessageInput = {
  cities: string[];
  departureDate: string;
  days: number;
  people: number;
  destinations: string[];
  restaurants: string[];
  grandTotal: number;
};

export function buildWhatsAppUrl(input: WaMessageInput): string {
  const { cities, departureDate, days, people, destinations, restaurants, grandTotal } = input;

  const nights    = Math.max(0, days - 1);
  const cityLabel = cities.length > 0 ? cities.join(", ") : "-";

  const destinationLines =
    destinations.length > 0
      ? destinations.map((d) => `   - ${d}`).join("\n")
      : "   - (belum dipilih)";

  const restaurantLines =
    restaurants.length > 0
      ? restaurants.map((r) => `   - ${r}`).join("\n")
      : "   - (belum dipilih)";

  const message = [
  "Halo Admin Zaid Tour,",
  "Saya tertarik untuk konsultasi rencana perjalanan EduTrip Jepang.",
  "Berikut rincian dari kalkulator website:",
  "",
  `\uD83D\uDCCD Kota Tujuan: ${cityLabel}`,
  `\uD83D\uDDD3\uFE0F Rencana Keberangkatan: ${departureDate}`,
  `\u23F3 Durasi: ${days} Hari ${nights} Malam`,
  `\uD83D\uDC65 Jumlah Peserta: ${people} Orang`,
  `\uD83C\uDF92 Destinasi Pilihan:`,
  destinationLines,
  `\uD83C\uDF7D\uFE0F Restoran Pilihan (Wishlist):`,
  restaurantLines,
  "(Catatan: Biaya penginapan dan transportasi harian otomatis termasuk dalam estimasi paket)",
  `\uD83D\uDCB0 Estimasi Biaya Total: *${formatIDR(grandTotal)}*`,
  "",
  "Saya telah membaca dan menyetujui Syarat & Ketentuan layanan.",
  "Mohon informasi lebih lanjut mengenai paket. Terima kasih!",
  ].join("\n");

  return `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
}