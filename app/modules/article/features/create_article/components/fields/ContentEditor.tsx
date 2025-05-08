import { TextRich } from "~/components/organisms";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}
export const ContentEditor = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}: Props) => (
  <div onBlur={onBlur} tabIndex={-1}>
    <label className="text-sm font-medium text-gray-900">
      Contenido del artículo
    </label>
    <TextRich
      maxHeight="600px"
      minHeight="250px"
      className="mt-2"
      value={value}
      onChange={onChange}
    />
    {touched && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);
