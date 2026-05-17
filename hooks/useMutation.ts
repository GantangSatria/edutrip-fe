import { useState, useCallback } from "react";

export interface MutationState<TResult> {
  loading: boolean;
  error: string | null;
  result: TResult | null;
  mutate: (...args: never[]) => Promise<TResult | null>;
  reset: () => void;
}

/**
 * Generic hook for create / update / delete operations.
 *
 * @example
 * const { mutate, loading, error } = useMutation(
 *   (payload: HotelPayload) => hotelService.create(payload),
 *   { onSuccess: () => refetch() }
 * );
 */
export function useMutation<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<{ data: TResult; success: boolean; message: string }>,
  options?: {
    onSuccess?: (result: TResult) => void;
    onError?: (message: string) => void;
  }
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TResult | null>(null);

  const mutate = useCallback(
    async (...args: TArgs): Promise<TResult | null> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fn(...args);
        setResult(res.data);
        options?.onSuccess?.(res.data);
        return res.data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(msg);
        options?.onError?.(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn]
  );

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return { loading, error, result, mutate, reset };
}