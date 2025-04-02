import { toSnakeCase } from "~/utilities/string_utilities";
import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
}

export const CustomInput: React.FC<Props> = ({
  label,
  startAdornment,
  endAdornment,
  className,
  ...rest
}) => {
  const id = toSnakeCase(label ?? "");

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startAdornment && (
          <div className="absolute left-3 flex items-center justify-center h-full">
            {startAdornment}
          </div>
        )}

        <input
          className={twMerge(
            "block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 ring-1 ring-gray-300 shadow-sm",
            "outline outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-600",
            "focus:ring-0 focus:ring-offset-0",
            startAdornment && "pl-10",
            endAdornment && "pr-10",
            className
          )}
          {...rest}
        />

        {endAdornment && (
          <div className="absolute right-3 flex items-center justify-center h-full">
            {endAdornment}
          </div>
        )}
      </div>
    </div>
  );
};
