import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface Props {
  label?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder: string;
  options: { id: string; name: string }[];
  isLoading?: boolean;
  isError?: boolean;
  emptyLabel?: string;
  showAllOption?: boolean;
  className?: string;
}

export const AsyncSelect: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  isLoading = false,
  isError = false,
  emptyLabel = "No hay resultados",
  showAllOption = true,
  className,
}) => {
  return (
    <>
      {label && <Label className="mb-2 block">{label}</Label>}
      <Select
        value={value || ""}
        onValueChange={(val) => onChange(val === "all" ? undefined : val)}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {isError ? (
            <SelectItem value="error" disabled>
              Error al cargar
            </SelectItem>
          ) : isLoading ? (
            <SelectItem value="loading" disabled>
              Cargando...
            </SelectItem>
          ) : !Array.isArray(options) || options.length === 0 ? (
            <SelectItem value="empty" disabled>
              {emptyLabel}
            </SelectItem>
          ) : (
            <>
              {options.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.name}
                </SelectItem>
              ))}
              {showAllOption && (
                <SelectItem key="all" value="all">
                  Todos
                </SelectItem>
              )}
            </>
          )}
        </SelectContent>
      </Select>
    </>
  );
};
