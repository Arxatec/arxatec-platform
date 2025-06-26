import { useState } from "react";

export interface ClientFilters {
  search: string;
  category: string;
  sortBy: string;
}

export const useClientsFilters = () => {
  const [filters, setFilters] = useState<ClientFilters>({
    search: "",
    category: "all",
    sortBy: "Más reciente",
  });

  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const updateCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const updateSortBy = (sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      sortBy: "Más reciente",
    });
  };

  return {
    filters,
    updateSearch,
    updateCategory,
    updateSortBy,
    resetFilters,
  };
};
