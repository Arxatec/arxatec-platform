import { useMemo } from "react";
import { useExternalClients } from "../use_external_clients";

interface FilterParams {
  search: string;
  category: string;
  sortBy: string;
}

export const useFilteredClients = (filters: FilterParams) => {
  const { data, isLoading, error, refetch } = useExternalClients();

  const filteredClients = useMemo(() => {
    if (!data?.data) return [];

    let clients = [...data.data];

    // Filtrar por búsqueda
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      clients = clients.filter(
        (client) =>
          client.title.toLowerCase().includes(searchTerm) ||
          client.description.toLowerCase().includes(searchTerm) ||
          client.reference_code.toLowerCase().includes(searchTerm)
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
        clients = clients.filter((client) => client.category_id === categoryId);
      }
    }

    // Ordenar
    clients.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (filters.sortBy === "Más reciente") {
        return dateB - dateA; // Más reciente primero
      } else {
        return dateA - dateB; // Más antiguo primero
      }
    });

    return clients;
  }, [data?.data, filters.search, filters.category, filters.sortBy]);

  return {
    data: filteredClients,
    isLoading,
    error,
    refetch,
    totalClients: data?.data?.length || 0,
    filteredCount: filteredClients.length,
  };
};
