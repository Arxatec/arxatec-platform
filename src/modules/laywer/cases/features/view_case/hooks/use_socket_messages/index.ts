import { useEffect } from "react";
import { socket } from "~/utilities";

export const useSocketMessages = (
  userId: number,
  onNewMessage: (data: any) => void
) => {
  useEffect(() => {
    if (!userId) return;

    // Conectar si aún no está conectado
    if (!socket.connected) {
      socket.connect();
    }

    // Unirse al canal del usuario
    socket.emit("join_user_channel", userId);

    // Escuchar nuevos mensajes
    socket.on("CASE_NEW_MESSAGE", onNewMessage);

    return () => {
      // Limpiar listener
      socket.off("CASE_NEW_MESSAGE", onNewMessage);
    };
  }, [userId, onNewMessage]);
};
