type PlanHeaderProps = {
  cartCount: number;
  onBack?: () => void;
  onCart?: () => void;
};

export function PlanHeader({ cartCount, onBack, onCart }: PlanHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
          aria-label="Kembali"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
            Rencanakan Trip
          </h1>
          <p className="text-[0.6rem] text-slate-400 sm:text-[0.65rem]">Tokyo & Osaka</p>
        </div>

        <button
          type="button"
          onClick={onCart}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
          aria-label="Keranjang"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[0.55rem] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}