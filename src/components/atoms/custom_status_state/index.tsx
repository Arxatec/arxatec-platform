import React from "react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface Props {
  icon?: React.ReactNode;
  title: string;
  message: string;
  className?: string;
}

export const CustomStatusState: React.FC<Props> = ({
  icon = <InboxIcon className="size-10 text-gray-300 mb-2" />,
  title,
  message,
  className = "",
}) => (
  <div
    className={twMerge(
      "flex flex-col items-center justify-center py-24 h-full text-center bg-white rounded-lg transition-all shadow hover:shadow-md",
      className
    )}
  >
    {icon}
    <h3 className="text-base text-gray-900 font-semibold">{title}</h3>
    <p className="text-gray-600 text-sm max-w-md">{message}</p>
  </div>
);
