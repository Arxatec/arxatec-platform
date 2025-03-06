import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { CustomToast } from "./components";

const showToast = (
  type: "success" | "error" | "warning" | "info",
  title: string,
  content: string
) => {
  toast(CustomToast, {
    data: {
      title,
      content,
      type,
    },
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
    theme: "light",
  });
};

export const ToastManager = {
  success: (title: string, content: string) =>
    showToast("success", title, content),
  error: (title: string, content: string) => showToast("error", title, content),
  warning: (title: string, content: string) =>
    showToast("warning", title, content),
  info: (title: string, content: string) => showToast("info", title, content),
};
