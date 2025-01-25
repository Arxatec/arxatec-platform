import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`py-2 px-4 font-semibold rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
