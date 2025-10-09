import { SOCKET_URL } from "@/config";
import { io } from "socket.io-client";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});
