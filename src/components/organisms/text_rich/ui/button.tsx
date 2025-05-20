import * as React from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Define types for variants and sizes
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

// Define base styles and variants as objects
const baseButtonStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

// Type for variant function parameters
interface ButtonVariantsProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// Function to get classes based on variants
function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: ButtonVariantsProps): string {
  return cn(
    baseButtonStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}

// Define interface for button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Visual variant of the button
  size?: ButtonSize; // Button size
  asChild?: boolean; // If true, renders the child instead of a <button>
  className?: string; // Additional classes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    // If asChild is true, renders the first child with button props and styles
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: buttonVariants({ variant, size, className }),
        ref: ref,
      } as React.HTMLAttributes<HTMLElement>);
    }

    // Otherwise, renders a standard HTML button with styles and props
    return (
      <button
        className={buttonVariants({ variant, size, className })} // Applies classes based on variant and size
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
