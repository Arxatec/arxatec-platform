import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services";

export const useGetCategoriesCase = () => {
  return useQuery({
    queryKey: ["categories_cases"],
    queryFn: getAllCategories,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};
