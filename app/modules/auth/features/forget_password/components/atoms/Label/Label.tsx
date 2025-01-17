import React, { type LabelHTMLAttributes, type ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  className?: string;
  children: ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  className = "",
  children,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};
