import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface Props {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
  bgColor?: string;
  textColor?: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const Stats: React.FC<Props> = ({
  icon,
  title,
  value,
  description,
  bgColor = "bg-white",
  textColor = "text-gray-900",
  iconBgColor = "bg-purple-100",
  iconTextColor = "text-purple-500",
}) => {
  return (
    <div
      className={`${bgColor} p-6 rounded-xl transition-all shadow-sm group hover:shadow-md cursor-pointer ${textColor}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          {icon || <ArrowUpRightIcon className={`w-5 h-5 ${iconTextColor}`} />}
        </div>
        <button className="transition-all">
          <ArrowUpRightIcon className="w-5 h-5 border-0 text-gray-400 group-hover:bottom-1 group-hover:left-1 transition-all relative " />
        </button>
      </div>
      <p className="text-sm opacity-80 mb-1">{title}</p>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      {description && <p className="text-sm opacity-60">{description}</p>}
    </div>
  );
};
