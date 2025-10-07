/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@/components/ui/";
import {
  type Control,
  type FieldErrors,
  type FieldValues,
  useController,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FormSelectProps {
  name: string;
  label: string;
  control: Control<any & FieldValues>;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  errors?: FieldErrors<any & FieldValues>;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  control,
  options,
  placeholder = "Selecciona una opción",
  className,
  errors,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className={`grid gap-2 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger
          className={twMerge(
            "w-full",
            errors?.[name] && "border-rose-500/10 border"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-full">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors?.[name] && (
        <p className="text-sm text-rose-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
