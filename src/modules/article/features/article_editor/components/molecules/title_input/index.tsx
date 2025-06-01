import { CustomInput } from "~/components/atoms";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}
export const TitleInput = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}: Props) => (
  <div>
    <CustomInput
      label="Título del artículo"
      placeholder="Ej. Nuestros derechos laborales"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
    {touched && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);
