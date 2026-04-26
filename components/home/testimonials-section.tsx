import { testimonials } from "@/data/travel";

export function TestimonialsSection() {
  return (
    <section className="bg-primary py-11 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-5xl lg:px-8">
        <h2 className="text-center text-[1.45rem] leading-tight font-semibold tracking-tight text-white sm:text-[1.75rem] lg:text-[2rem]">
          Kata Mereka
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-xl bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
            >
              <div className="h-2 w-2 rounded-full bg-white/80" />
              <p className="mt-2 text-[0.7rem] leading-relaxed">{item.quote}</p>
              <p className="mt-2 text-[0.68rem] font-semibold">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}