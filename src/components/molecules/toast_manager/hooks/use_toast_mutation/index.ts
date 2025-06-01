import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { ToastManager, showToast } from "../../";
import { toast } from "react-toastify";
import { useRef } from "react";

interface ToastMutationOptions<TData, TError, TVariables, TContext> {
  mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>;
  toastOptions?: {
    loading?: {
      title: string;
      content: string;
    };
    success?: {
      title: string;
      content: string;
    };
    error?: {
      title: string;
      content: string;
    };
    minLoadingTime?: number;
  };
}

export const useToastMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>({
  mutationOptions,
  toastOptions,
}: ToastMutationOptions<TData, TError, TVariables, TContext>) => {
  const loadingToastId = useRef<string | number | null>(null);
  const startTime = useRef<number>(0);

  return useMutation({
    ...mutationOptions,
    onMutate: async (variables) => {
      const result = await mutationOptions.onMutate?.(variables);

      if (toastOptions?.loading) {
        startTime.current = Date.now();
        showToast(
          "loading",
          toastOptions.loading.title,
          toastOptions.loading.content
        );
        loadingToastId.current = `loading-${Date.now()}`;
      }

      return result;
    },
    onSuccess: async (data, variables, context) => {
      if (loadingToastId.current && toastOptions?.loading) {
        const elapsedTime = Date.now() - startTime.current;
        const minTime = toastOptions.minLoadingTime || 800;

        if (elapsedTime < minTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minTime - elapsedTime)
          );
        }

        toast.dismiss();
        loadingToastId.current = null;
      }

      if (toastOptions?.success) {
        ToastManager.success(
          toastOptions.success.title,
          toastOptions.success.content
        );
      }

      mutationOptions.onSuccess?.(data, variables, context);
    },
    onError: async (error, variables, context) => {
      if (loadingToastId.current && toastOptions?.loading) {
        const elapsedTime = Date.now() - startTime.current;
        const minTime = toastOptions.minLoadingTime || 500;

        if (elapsedTime < minTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minTime - elapsedTime)
          );
        }

        toast.dismiss();
        loadingToastId.current = null;
      }

      if (toastOptions?.error) {
        const errorMessage =
          toastOptions.error.content ||
          (error instanceof Error ? error.message : "Ha ocurrido un error");

        ToastManager.error(toastOptions.error.title, errorMessage);
      }

      mutationOptions.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      if (loadingToastId.current) {
        toast.dismiss();
        loadingToastId.current = null;
      }

      mutationOptions.onSettled?.(data, error, variables, context);
    },
  });
};
