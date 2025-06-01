import { useCallback } from "react";
import { useCreateArticleMutation, useUpdateArticleMutation } from "..";

export const useArticleMutations = (
  reset: () => void,
  setLocation: (location: string) => void
) => {
  const onSuccess = useCallback(() => {
    reset();
    setLocation("/");
  }, [reset, setLocation]);

  const mutationCreate = useCreateArticleMutation(onSuccess);
  const mutationUpdate = useUpdateArticleMutation(onSuccess);

  return { mutationCreate, mutationUpdate };
};
