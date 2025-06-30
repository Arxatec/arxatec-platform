import { useQuery } from "@tanstack/react-query";
import { getPersonalCases } from "../../services";

export const usePersonalCases = () => {
  return useQuery({
    queryKey: ["personal-cases"],
    queryFn: getPersonalCases,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};
