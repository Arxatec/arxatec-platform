import { useQuery } from "@tanstack/react-query";
import { getPersonalCases } from "../../services";
import type { CasesApiResponse } from "../../types";

export const usePersonalCases = () => {
  return useQuery<CasesApiResponse, Error>({
    queryKey: ["personal-cases-lawyer"],
    queryFn: getPersonalCases,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
