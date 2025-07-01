import { useQuery } from "@tanstack/react-query";
import { getLawyer } from "../../services";

export const useLawyer = (id: string) => {
  return useQuery({
    queryKey: ["lawyer", id],
    queryFn: () => getLawyer(id),
    enabled: false,
  });
};
