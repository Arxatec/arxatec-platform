import { toSnakeCase } from "~/utilities/string_utilities";
import React, { type ReactNode } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startAdornment?: ReactNode; // Elemento antes del input (icono, etc.)
  endAdornment?: ReactNode; // Elemento después del input (botón, etc.)
}

export const CustomInput: React.FC<Props> = ({
  label,
  startAdornment,
  endAdornment,
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
        {/* Elemento al inicio */}
        {startAdornment && (
          <div className="absolute left-3">{startAdornment}</div>
        )}

        <input
          id={id}
          name={id}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 
            -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline 
            focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
            ${startAdornment ? "pl-10" : ""} ${endAdornment ? "pr-10" : ""}`}
          {...rest} // Permite todas las props de <input>
        />

        {/* Elemento al final */}
        {endAdornment && <div className="absolute right-3">{endAdornment}</div>}
      </div>
    </div>
  );
};
