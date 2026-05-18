import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-10 text-center text-white">
      <div className="mx-auto flex flex-col items-center gap-3">
        <Image
          src="/Logo_Edutrip.png"
          alt="EduTrip Japan"
          width={56}
          height={56}
          className="rounded-full"
        />
        <p className="text-base font-semibold sm:text-lg">EDUTRIP Japan</p>
      </div>

      <p className="mt-2 text-xs text-white/70">
        Platform perencanaan perjalanan edukasi &amp; wisata halal ke Jepang
      </p>

      <p className="mt-4 text-xs text-white/50">
        ©2026 EDUTRIP Japan. All rights reserved.
      </p>
    </footer>
  );
}