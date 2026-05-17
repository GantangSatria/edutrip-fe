export function TripPickerSection() {
  return (
    <section className="bg-section py-11 sm:py-14 lg:py-16">
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Mau Trip yang Gimana?
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Pilih gaya perjalananmu untuk destinasi yang cocok
        </p>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-md gap-4 px-4 sm:max-w-2xl sm:grid-cols-2 sm:px-6 lg:max-w-5xl lg:gap-6 lg:px-8">
        
        {/* CARD 1 */}
        <article className="relative rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          
          {/* Arrow */}
          <span className="absolute right-4 top-4 text-lg text-gray-400">
            &gt;
          </span>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900">
            Mau travel santai & have fun?
          </h3>

          {/* Sub */}
          <p className="mt-2 text-sm text-green-600">
            Santai & Have Fun
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem]">
            <span className="rounded-full bg-gray-100 px-3 py-1">Taman & Wisata</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">Masjid</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">Kuliner Halal</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">Hotel</span>
          </div>
        </article>

        {/* CARD 2 */}
        <article className="relative rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          
          <span className="absolute right-4 top-4 text-lg text-gray-400">
            &gt;
          </span>

          <h3 className="text-sm font-semibold text-gray-900">
            Mau travel plus ilmu tambahan?
          </h3>

          <p className="mt-2 text-sm text-green-600">
            Edukasi & Ilmu
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem]">
            <span className="rounded-full bg-gray-100 px-3 py-1">Pabrik & Industri</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">Universitas</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">Masjid</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">Museum & Landmark</span>
          </div>
        </article>

      </div>

      <p className="mt-8 text-center text-sm font-medium text-green-600">
        Lihat Destinasi
      </p>
    </section>
  );
}