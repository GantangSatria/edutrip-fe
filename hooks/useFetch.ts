import { useState, useEffect, useCallback, useRef } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Generic hook for data fetching with loading / error state.
 *
 * @example
 * const { data, loading, error, refetch } = useFetch(() => hotelService.getAll({ kota: "Tokyo" }));
 */
export function useFetch<T>(
  fetcher: () => Promise<{ data: T; success: boolean; message: string }>,
  deps: unknown[] = []
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Use a counter to trigger manual refetches
  const [tick, setTick] = useState(0);

  // Keep fetcher stable across renders without adding it to deps
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetcherRef.current();
        if (!cancelled) setData(res.data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return { data, loading, error, refetch };
}