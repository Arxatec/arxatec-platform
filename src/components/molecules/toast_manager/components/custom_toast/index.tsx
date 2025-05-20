import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { CustomProgressBar } from "../custom_progress_bar";

interface ToastData {
  title: string;
  content: string;
  type: "success" | "error" | "warning" | "info";
}

interface Props {
  toastProps: any;
  data: ToastData;
}

const toastConfig = {
  success: { color: "#22c55e", Icon: CheckCircleIcon },
  error: { color: "#ef4444", Icon: XCircleIcon },
  warning: { color: "#eab308", Icon: ExclamationTriangleIcon },
  info: { color: "#3b82f6", Icon: InformationCircleIcon },
  default: { color: "#6b7280", Icon: InformationCircleIcon },
};

export const CustomToast = ({ toastProps, data }: Props) => {
  const [progress, setProgress] = useState(100);

  const config = data.type
    ? toastConfig[data.type] || toastConfig.default
    : toastConfig.default;

  useEffect(() => {
    setProgress(0);
  }, []);

  return (
    <div className="pb-2">
      <div className="grid items-center grid-cols-[auto_1fr] gap-y-1">
        <config.Icon className={`size-6 my-auto`} color={config.color} />
        <h3 className="text-sm font-semibold text-gray-900 font-sans ml-2">
          {data.title}
        </h3>
        <div></div>
        <p className="text-sm font-sans text-gray-500 ml-2">{data.content}</p>
      </div>
      <CustomProgressBar progress={progress} color={config.color} />
    </div>
  );
};
