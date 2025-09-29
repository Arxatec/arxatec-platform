import { Input, Label } from "@/components/ui";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  className,
}: Props<T>) {
  const error = errors[name];

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={twMerge(error ? "border-rose-500/10 border" : "", className)}
      />
      {error && (
        <p className="text-sm text-rose-500" data-testid={`${name}-error`}>
          {error.message as string}
        </p>
      )}
    </div>
  );
}
