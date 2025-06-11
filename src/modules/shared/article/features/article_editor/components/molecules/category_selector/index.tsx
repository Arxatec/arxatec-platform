import { useEffect } from "react";
import { CustomSelector } from "~/components/atoms";
import type { Category } from "../../../models";

interface Props {
  value: Category | null;
  onChange: (c: Category) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  defaultCategory?: Category;
  categories: Category[];
}

export const CategorySelector = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  defaultCategory,
  categories,
}: Props) => {
  const firstCategory = categories[0];
  const selectedValue = value ?? defaultCategory ?? firstCategory;

  useEffect(() => {
    if (!value && firstCategory) {
      onChange(defaultCategory ?? firstCategory);
    }
  }, [value, onChange, defaultCategory, firstCategory]);

  return (
    <div onBlur={onBlur} tabIndex={-1}>
      <CustomSelector
        label="Categoría"
        options={categories}
        selected={selectedValue}
        onChange={onChange}
        displayKey="name"
      />
      {touched && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};
