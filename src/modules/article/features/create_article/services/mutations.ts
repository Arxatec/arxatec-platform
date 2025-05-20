import { useMutation } from "@tanstack/react-query";
import { createArticle } from "./api";

export const useCreateArticleMutation = () => {
  return useMutation({
    mutationFn: createArticle,
  });
};
