import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { SpinnerLoader } from "~/components/atoms";

interface ToastData {
  title: string;
  content: string;
  type: "success" | "error" | "warning" | "info" | "loading";
}

interface ToastProps {
  closeToast: () => void;
}

interface Props {
  toastProps: ToastProps;
  data: ToastData;
}

const toastConfig = {
  success: { color: "#22c55e", Icon: CheckCircleIcon },
  error: { color: "#ef4444", Icon: XCircleIcon },
  warning: { color: "#eab308", Icon: ExclamationTriangleIcon },
  info: { color: "#3b82f6", Icon: InformationCircleIcon },
  default: { color: "#6b7280", Icon: InformationCircleIcon },
};

export const CustomToast = ({ data }: Props) => {
  const config = data.type
    ? toastConfig[data.type] || toastConfig.default
    : toastConfig.default;

  return (
    <div className=" w-96 min-w-96 max-w-96">
      <div className="grid items-center grid-cols-[auto_1fr]">
        {data.type === "loading" ? (
          <SpinnerLoader size={18} color={config.color} />
        ) : (
          <config.Icon className={`size-6 my-auto`} color={config.color} />
        )}
        <h3 className="text-sm font-semibold text-gray-900 font-sans ml-3 break-words">
          {data.title}
        </h3>
        <div></div>
        <p className="text-sm font-sans text-gray-500 ml-3 break-words">
          {data.content}
        </p>
      </div>
    </div>
  );
};
