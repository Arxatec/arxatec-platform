import { useState } from "react";
import { useDebounce } from "~/hooks";

interface FilterOption {
  id: string;
  name: string;
}

export const useCasesFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>({
    id: "all",
    name: "Todos",
  });
  const [selectedSort, setSelectedSort] = useState<FilterOption>({
    id: "Más reciente",
    name: "Más reciente",
  });

  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const categoryOptions: FilterOption[] = [
    { id: "all", name: "Todos" },
    { id: "civil", name: "Civil" },
    { id: "laboral", name: "Laboral" },
    { id: "familiar", name: "Familiar" },
    { id: "penal", name: "Penal" },
    { id: "comercial", name: "Comercial" },
  ];

  const sortOptions: FilterOption[] = [
    { id: "Más reciente", name: "Más reciente" },
    { id: "Más antiguo", name: "Más antiguo" },
  ];

  const filters = {
    search: debouncedSearchTerm,
    category: selectedCategory.id,
    sortBy: selectedSort.id,
  };

  return {
    // State
    searchTerm,
    selectedCategory,
    selectedSort,

    // Options
    categoryOptions,
    sortOptions,

    // Actions
    setSearchTerm,
    setSelectedCategory,
    setSelectedSort,

    // Computed
    filters,
  };
};
