import { useState, useEffect } from "react";

export function useJpyRate() {
  const [jpyRate, setJpyRate] = useState<number | null>(null);

  useEffect(() => {
    const api = "https://api.frankfurter.dev";
    fetch(`${api}/v2/rate/JPY/IDR`)
      .then((r) => r.json())
      .then((d) => {
        if (d && d.rate) {
          setJpyRate(d.rate);
        }
      })
      .catch((e) => console.error("Failed to fetch JPY rate:", e));
  }, []);

  return jpyRate;
}
