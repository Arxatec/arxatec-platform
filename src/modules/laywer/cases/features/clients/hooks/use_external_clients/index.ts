import { useQuery } from "@tanstack/react-query";
import { getExternalClients } from "../../services";
import type { ClientsApiResponse } from "../../types";

export const useExternalClients = () => {
  return useQuery<ClientsApiResponse, Error>({
    queryKey: ["external-clients"],
    queryFn: getExternalClients,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
