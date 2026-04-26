"use client";

import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 text-black">
        
        <span className="text-[1.1rem] font-semibold sm:text-[1.25rem]">
          EDUTRIP Japan
        </span>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <a 
            href="#" 
            className="px-2 py-1.5 hover:border-gray-500 hover:text-black transition-all">
            Explore
          </a>
          <a 
            href="#" 
            className="px-2 py-1.5 hover:border-gray-500 hover:text-black transition-all">
            Plane Information
          </a>
          <a
            href="#"
            className="px-2 py-1.5 hover:border-gray-500 hover:text-black transition-all"
          >
            Admin
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="h-[2px] w-5 bg-black"></span>
          <span className="h-[2px] w-5 bg-black"></span>
          <span className="h-[2px] w-5 bg-black"></span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 text-gray-500 text-sm gap-3">
          <a href="#" className="px-4 text-center hover:border-gray-500 hover:text-black transition-all">
            Explore
          </a>
          <a href="#" className="px-4 text-center hover:border-gray-500 hover:text-black transition-all">
            Plane Information
          </a>
          <a
            href="#"
            className="px-4 text-center hover:border-gray-500 hover:text-black transition-all"
          >
            Admin
          </a>
        </div>
      )}
    </div>
  );
}