import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../services";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ({ idCase, message }: { idCase: string; message: string }) =>
      sendMessage(idCase, message),
  });
};
