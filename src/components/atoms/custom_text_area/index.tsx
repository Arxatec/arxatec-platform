import { toSnakeCase } from "~/utilities/string_utilities";
import React, { type ReactNode } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isRequired?: boolean;
}

export const CustomTextArea: React.FC<Props> = ({
  label,
  startAdornment,
  endAdornment,
  isRequired = true,
  ...rest
}) => {
  const id = toSnakeCase(label ?? "");

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
          <div className="absolute left-3 top-3">{startAdornment}</div>
        )}

        <textarea
          id={id}
          name={id}
          className={`block w-full rounded-md bg-white px-3 py-2.5 text-sm text-gray-900 outline outline-1 
            -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline 
            focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none h-[100px]
            ${startAdornment ? "pl-10" : ""} ${endAdornment ? "pr-10" : ""}`}
          required={isRequired}
          {...rest}
        />

        {endAdornment && (
          <div className="absolute right-3 top-3">{endAdornment}</div>
        )}
      </div>
    </div>
  );
};
