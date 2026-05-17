"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

import { FlightPriceModal } from "@/components/layout/flight-price-modal";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [flightModalOpen, setFlightModalOpen] = useState(false);

  const openFlightModal = useCallback(() => {
    setFlightModalOpen(true);
    setIsOpen(false);
  }, []);

  const closeFlightModal = useCallback(() => {
    setFlightModalOpen(false);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md md:opacity-75">
        <div className="flex items-center justify-between px-4 py-3 text-black">
          <span className="text-[1.1rem] font-semibold sm:text-[1.25rem]">EDUTRIP Japan</span>

          <div className="hidden items-center gap-6 text-sm text-gray-500 md:flex">
            <Link
              href="/plan"
              className="px-2 py-1.5 transition-all hover:text-black"
            >
              Explore
            </Link>
            <button
              type="button"
              onClick={openFlightModal}
              className="px-2 py-1.5 transition-all hover:text-black"
            >
              Plane Information
            </button>
            <Link
              href="/admin"
              className="px-2 py-1.5 transition-all hover:text-black"
            >
              Admin
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1 md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            <span className="h-[2px] w-5 bg-black" />
            <span className="h-[2px] w-5 bg-black" />
            <span className="h-[2px] w-5 bg-black" />
          </button>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-3 px-4 pb-4 text-sm text-gray-500 md:hidden">
            <Link
              href="/plan"
              className="px-4 text-center transition-all hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <button
              type="button"
              onClick={openFlightModal}
              className="px-4 text-center transition-all hover:text-black"
            >
              Plane Information
            </button>
            <Link
              href="/admin"
              className="px-4 text-center transition-all hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>

      <FlightPriceModal open={flightModalOpen} onClose={closeFlightModal} />
    </>
  );
}
