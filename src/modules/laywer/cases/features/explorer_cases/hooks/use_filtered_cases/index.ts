import { useMemo } from "react";
import { useExploreCases } from "../use_explore_cases";

interface FilterParams {
  search: string;
  category: string;
  sortBy: string;
}

export const useFilteredCases = (filters: FilterParams) => {
  const { data, isLoading, error, refetch } = useExploreCases();

  const filteredCases = useMemo(() => {
    if (!data?.data.cases) return [];

    let cases = [...data.data.cases];

    // Filtrar por búsqueda
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      cases = cases.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(searchTerm) ||
          caseItem.description.toLowerCase().includes(searchTerm) ||
          caseItem.reference_code.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por categoría
    if (filters.category && filters.category !== "all") {
      const categoryMap: { [key: string]: number } = {
        civil: 2,
        laboral: 1,
        familiar: 4,
        penal: 3,
        comercial: 5,
      };

      const categoryId = categoryMap[filters.category];
      if (categoryId) {
        cases = cases.filter((caseItem) => caseItem.category_id === categoryId);
      }
    }

    // Ordenar
    cases.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (filters.sortBy === "Más reciente") {
        return dateB - dateA; // Más reciente primero
      } else {
        return dateA - dateB; // Más antiguo primero
      }
    });

    return cases;
  }, [data?.data.cases, filters.search, filters.category, filters.sortBy]);

  return {
    data: filteredCases,
    isLoading,
    error,
    refetch,
    totalCases: data?.data.cases.length || 0,
    filteredCount: filteredCases.length,
  };
};
