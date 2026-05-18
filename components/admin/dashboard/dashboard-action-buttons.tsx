"use client";

import { useState } from "react";

type DashboardActionButtonsProps = {
  itemId: string;
  layout?: "horizontal" | "vertical";
  onEdit?: (itemId: string) => void;
  onDelete?: (itemId: string) => Promise<void>;
};

export function DashboardActionButtons({
  itemId,
  layout = "horizontal",
  onEdit,
  onDelete,
}: DashboardActionButtonsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(itemId);
    } finally {
      setIsDeleting(false);
    }
  };

  const buttonClass = `inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all active:scale-95 text-xs sm:text-sm ${
    layout === "vertical" ? "flex-1" : ""
  }`;

  const editButtonClass = `${buttonClass} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`;
  const deleteButtonClass = `${buttonClass} border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <div className={`flex gap-2 w-full ${layout === "vertical" ? "flex-col" : ""}`}>
      <button 
        type="button"
        onClick={() => onEdit?.(itemId)}
        className={editButtonClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span className="hidden sm:inline">Edit</span>
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className={deleteButtonClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        <span className="hidden sm:inline">{isDeleting ? "Menghapus..." : "Hapus"}</span>
      </button>
    </div>
  );
}
