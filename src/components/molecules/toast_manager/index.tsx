import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { CustomToast } from "./components";

export const showToast = (
  type: "success" | "error" | "warning" | "info" | "loading",
  title: string,
  content: string
) => {
  toast(
    ({ closeToast }) => (
      <CustomToast
        toastProps={{ closeToast }}
        data={{
          title,
          content,
          type,
        }}
      />
    ),
    {
      position: "bottom-right",
      autoClose: type === "loading" ? false : 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      theme: "light",
    }
  );
};

interface PromiseToastOptions {
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
}

interface PromiseToastResult<T> {
  toastId: string | number;
  promise: Promise<T>;
}

export const showPromiseToast = <T,>(
  promise: Promise<T>,
  options: PromiseToastOptions
): PromiseToastResult<T> => {
  const toastId = toast(
    ({ closeToast }) => (
      <CustomToast
        toastProps={{ closeToast }}
        data={{
          title: options.loading?.title || "Cargando...",
          content: options.loading?.content || "Procesando solicitud...",
          type: "loading",
        }}
      />
    ),
    {
      toastId: "promise-toast-" + Date.now(),
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      theme: "light",
    }
  );

  const promiseWithToast = promise
    .then((result) => {
      toast.dismiss(toastId);

      toast(
        ({ closeToast }) => (
          <CustomToast
            toastProps={{ closeToast }}
            data={{
              title: options.success?.title || "¡Éxito!",
              content:
                options.success?.content || "Operación completada exitosamente",
              type: "success",
            }}
          />
        ),
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
          theme: "light",
        }
      );

      return result;
    })
    .catch((error) => {
      toast.dismiss(toastId);

      const errorMessage =
        error?.message || error?.toString() || "Ha ocurrido un error";

      toast(
        ({ closeToast }) => (
          <CustomToast
            toastProps={{ closeToast }}
            data={{
              title: options.error?.title || "Error",
              content: options.error?.content || errorMessage,
              type: "error",
            }}
          />
        ),
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
          theme: "light",
        }
      );

      throw error;
    });

  return {
    toastId,
    promise: promiseWithToast,
  };
};

export const ToastManager = {
  success: (title: string, content: string) =>
    showToast("success", title, content),
  error: (title: string, content: string) => showToast("error", title, content),
  warning: (title: string, content: string) =>
    showToast("warning", title, content),
  info: (title: string, content: string) => showToast("info", title, content),
  loading: (title: string, content: string) =>
    showToast("loading", title, content),

  promise: <T,>(promise: Promise<T>, options: PromiseToastOptions) =>
    showPromiseToast(promise, options),
};

export type { PromiseToastOptions, PromiseToastResult };
export { useToastMutation, useToastQuery } from "./hooks";
