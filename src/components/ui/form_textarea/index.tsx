import { Label, Textarea } from "@/components/ui";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

export function FormTextarea<T extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  errors,
  className,
}: Props<T>) {
  const error = errors[name];

  return (
    <div>
      {label && (
        <Label className="mb-2 block" htmlFor={name}>
          {label}
        </Label>
      )}
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={twMerge(error && "border-rose-500/10 border", className)}
      />
      {error && (
        <p className="text-sm text-rose-500 mt-2" data-testid={`${name}-error`}>
          {error.message as string}
        </p>
      )}
    </div>
  );
}
