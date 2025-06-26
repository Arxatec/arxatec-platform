import { useQuery } from "@tanstack/react-query";
import { getExploreCases } from "../../services";
import type { CasesApiResponse } from "../../types";

export const useExploreCases = () => {
  return useQuery<CasesApiResponse, Error>({
    queryKey: ["explore-cases"],
    queryFn: getExploreCases,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
