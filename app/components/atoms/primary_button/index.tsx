import { SpinnerLoader } from "..";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loader?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  children,
  loader,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center justify-center text-center transition-all ",
        className
      )}
      {...rest}
    >
      {loader ? <SpinnerLoader size={18} /> : children}
    </button>
  );
};
