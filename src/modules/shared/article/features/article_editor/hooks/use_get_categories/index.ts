import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
