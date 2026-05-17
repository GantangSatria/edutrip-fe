"use client";

import { useEffect, useRef } from "react";

export type CrudModalMode = "create" | "edit" | "view";

type AdminCrudModalProps = {
  isOpen: boolean;
  mode: CrudModalMode;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function AdminCrudModal({
  isOpen,
  mode,
  title,
  subtitle,
  onClose,
  children,
}: AdminCrudModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onClick={handleBackdropClick}
      className="max-h-dvh w-full max-w-full rounded-2xl bg-white shadow-xl backdrop:bg-black/40 sm:max-h-screen sm:max-w-2xl"
    >
      {/* Modal Header */}
      <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg sm:h-11 sm:w-11">
              {mode === "create" ? "➕" : mode === "edit" ? "✏️" : "👁️"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
              {subtitle && <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 active:scale-95 sm:h-9 sm:w-9"
          aria-label="Tutup"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Modal Content */}
      <div className="overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">{children}</div>
    </dialog>
  );
}
