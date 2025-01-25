import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};
