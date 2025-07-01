import React from "react";
import { ComputerDesktopIcon } from "@heroicons/react/16/solid";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center mb-4">
      <div
        className={`flex items-center justify-center size-7 rounded-full bg-gray-100 text-gray-500 mr-2 `}
      >
        <ComputerDesktopIcon className="size-5" />
      </div>
      <div className="flex items-center space-x-0.5 p-2 bg-gray-100 w-fit rounded-md">
        <div
          className="size-1 rounded-full bg-gray-400 animate-pulse"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="size-1 rounded-full bg-gray-400 animate-pulse"
          style={{ animationDelay: "300ms" }}
        ></div>
        <div
          className="size-1 rounded-full bg-gray-400 animate-pulse"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>
    </div>
  );
};
