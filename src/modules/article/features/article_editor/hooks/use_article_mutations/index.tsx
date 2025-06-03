import { useCallback } from "react";
import { useCreateArticleMutation, useUpdateArticleMutation } from "..";

export const useArticleMutations = (reset: () => void) => {
  const onSuccess = useCallback(() => {
    reset();
    window.history.back();
  }, [reset]);

  const mutationCreate = useCreateArticleMutation(onSuccess);
  const mutationUpdate = useUpdateArticleMutation(onSuccess);

  return { mutationCreate, mutationUpdate };
};
