import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { useCasesFilters } from "../../../hooks";

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    category: string;
    sortBy: string;
  }) => void;
}

export const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const {
    searchTerm,
    selectedCategory,
    selectedSort,
    categoryOptions,
    sortOptions,
    setSearchTerm,
    setSelectedCategory,
    setSelectedSort,
    filters,
  } = useCasesFilters();

  // Notify parent component when filters change
  React.useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <div className="flex gap-2 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all mb-2">
      <div className="w-full">
        <CustomInput
          placeholder="Buscar casos..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={
            <MagnifyingGlassIcon className="size-5 text-gray-500" />
          }
        />
      </div>
      <div className="w-56">
        <CustomSelector
          options={categoryOptions}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <div className="w-56">
        <CustomSelector
          options={sortOptions}
          selected={selectedSort}
          onChange={setSelectedSort}
        />
      </div>
    </div>
  );
};
