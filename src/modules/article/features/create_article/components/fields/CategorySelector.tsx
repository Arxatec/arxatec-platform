import { CustomSelector } from "~/components/atoms";
import { CATEGORIES } from "../../hooks/useCreateArticle";
import type { Category } from "../../hooks/useCreateArticle";

interface Props {
  value: Category | null;
  onChange: (c: Category) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}
export const CategorySelector = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}: Props) => (
  <div onBlur={onBlur} tabIndex={-1}>
    <CustomSelector
      label="Categoría"
      options={CATEGORIES}
      selected={value ?? CATEGORIES[0]}
      onChange={onChange}
      displayKey="name"
    />
    {touched && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);
