import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { ToastManager } from "../../";
import { useEffect } from "react";

interface ToastQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends readonly unknown[]
> {
  queryOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
  toastOptions?: {
    error?: {
      title: string;
      content: string;
    };
    showErrorToast?: boolean;
  };
}

export const useToastQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[]
>({
  queryOptions,
  toastOptions,
}: ToastQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {
  const query = useQuery({
    ...queryOptions,
    retry: queryOptions.retry ?? false,
  });

  useEffect(() => {
    if (query.error && (toastOptions?.showErrorToast ?? true)) {
      const errorMessage =
        toastOptions?.error?.content ||
        (query.error instanceof Error
          ? query.error.message
          : "Error al cargar los datos");

      ToastManager.error(toastOptions?.error?.title || "Error", errorMessage);
    }
  }, [query.error, toastOptions]);

  return query;
};
