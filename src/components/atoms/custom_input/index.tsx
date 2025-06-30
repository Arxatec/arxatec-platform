import { toSnakeCase } from "~/utilities/string_utilities";
import React, { type ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
  isRequired?: boolean;
}

export const CustomInput: React.FC<Props> = ({
  label,
  startAdornment,
  endAdornment,
  className,
  type = "text",
  isRequired = true,
  ...rest
}) => {
  const id = toSnakeCase(label ?? "");
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordToggleIcon = showPassword ? (
    <EyeSlashIcon
      className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      onClick={handleTogglePassword}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTogglePassword();
        }
      }}
    />
  ) : (
    <EyeIcon
      className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      onClick={handleTogglePassword}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTogglePassword();
        }
      }}
    />
  );

  return (
    <div>
      {label && (
        <div className="w-full flex items-center gap-1 mb-2">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-900"
          >
            {label}
          </label>
          {!isRequired && (
            <span className="text-xs text-gray-500">(opcional)</span>
          )}
        </div>
      )}
      <div className="relative flex items-center">
        {startAdornment && (
          <div className="absolute left-3 flex items-center justify-center h-full">
            {startAdornment}
          </div>
        )}

        <input
          id={id}
          type={inputType}
          className={twMerge(
            "block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 ring-1 ring-gray-300 shadow-sm",
            "outline outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-600",
            "focus:ring-0 focus:ring-offset-0",
            startAdornment && "pl-10",
            (endAdornment || isPassword) && "pr-10",
            className
          )}
          required={isRequired}
          {...rest}
        />

        <div className="absolute right-3 flex items-center justify-center h-full">
          {isPassword ? passwordToggleIcon : endAdornment}
        </div>
      </div>
    </div>
  );
};
