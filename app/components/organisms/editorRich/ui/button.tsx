import * as React from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Definimos los tipos para las variantes y tamaños
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

// Definir estilos base y variantes como objetos
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

// Tipo para los parámetros de la función de variantes
interface ButtonVariantsProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// Función para obtener las clases según las variantes
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

// Definimos la interfaz para las props del botón
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Variante visual del botón
  size?: ButtonSize; // Tamaño del botón
  asChild?: boolean; // Si es true, renderiza el hijo en vez de un <button>
  className?: string; // Clases adicionales
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
    // Si asChild es true, renderiza el primer hijo con las props y estilos del botón
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: buttonVariants({ variant, size, className }),
        ref: ref,
      } as React.HTMLAttributes<HTMLElement>);
    }

    // Si no, renderiza un botón HTML estándar con los estilos y props
    return (
      <button
        className={buttonVariants({ variant, size, className })} // Aplica las clases según variante y tamaño
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
