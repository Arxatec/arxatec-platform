import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { CustomProgressBar } from "..";

interface Props {
  toastProps: any;
  data: {
    title: string;
    content: string;
    type: "success" | "error" | "warning" | "info";
  };
}
export const CustomToast = ({ toastProps, data }: Props) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setProgress(0);
  }, []);

  const getToastConfig = () => {
    switch (data.type) {
      case "success":
        return { color: "#22c55e", Icon: CheckCircleIcon };
      case "error":
        return { color: "#ef4444", Icon: XCircleIcon };
      case "warning":
        return { color: "#eab308", Icon: ExclamationTriangleIcon };
      case "info":
        return { color: "#3b82f6", Icon: InformationCircleIcon };
      default:
        return { color: "#6b7280", Icon: InformationCircleIcon };
    }
  };

  const { color, Icon } = getToastConfig();
  return (
    <div className="pb-2">
      <div className="grid items-center grid-cols-[auto_1fr] gap-y-1">
        <Icon className={`size-6 my-auto`} color={color} />
        <h3 className="text-sm font-semibold text-gray-900 font-sans ml-2">
          {data.title}
        </h3>
        <div></div>
        <p className="text-sm font-sans text-gray-500 ml-2">{data.content}</p>
      </div>
      <CustomProgressBar progress={progress} color={color} />
    </div>
  );
};
