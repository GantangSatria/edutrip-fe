"use client";

import { useState, FormEvent } from "react";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-3 sm:text-base";

export function AdminLoginForm() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      // Placeholder: wire to auth API when ready
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Welcome Back, Admin!</h1>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">Masuk untuk mulai mengelola.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 sm:mt-10">
        <div>
          <label htmlFor="admin-id" className="text-sm font-medium text-slate-700">
            ID
          </label>
          <input
            id="admin-id"
            name="adminId"
            type="text"
            autoComplete="username"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className={inputClass}
            placeholder="Masukkan ID admin"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-all hover:bg-primary-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5 sm:text-base"
        >
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}
