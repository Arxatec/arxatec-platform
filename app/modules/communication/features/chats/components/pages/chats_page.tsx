import { useState } from "react";
import type { Message, User, MediaItem } from "../../types";
import { ChatArea, InfoPanel, SidebarChats } from "../organism";

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<User | null>(null);

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: "image",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-01-22%20a%20la(s)%204.25.38%E2%80%AFp.%C2%A0m.-SmLK1p3674z2OrAxGsRhMY6kIf8eGD.png",
    },
    // Add more media items
  ];

  const users: User[] = [
    {
      id: 1,
      name: "Contratos laborales",
      avatar:
        "https://images.pexels.com/photos/4427816/pexels-photo-4427816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isGroup: true,
      members: 1,
      online: 1,
      description: "Clientes con una consulta legal sobre un contrato.",
    },

    {
      id: 2,
      name: "Alfred Smith",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isGroup: false,
      members: 1,
      online: 1,
      description: "Clientes con una consulta legal sobre un contrato.",
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      userId: 1,
      content:
        "¡Hola, abogado! Tengo una duda sobre un contrato de arrendamiento.",
      timestamp: "10:00 AM",
      sender: "Carlos Gómez",
    },
    {
      id: 2,
      userId: 2,
      content: "¡Hola, Carlos! Claro, dime en qué puedo ayudarte.",
      timestamp: "10:02 AM",
      sender: "You",
    },
    {
      id: 3,
      userId: 1,
      content:
        "Firmé un contrato de alquiler por un año, pero necesito mudarme antes. ¿Puedo cancelarlo sin pagar penalización?",
      timestamp: "10:05 AM",
      sender: "Carlos Gómez",
    },
    {
      id: 4,
      userId: 2,
      content:
        "Depende de las cláusulas del contrato. ¿Puedes enviarme una copia para revisarlo?",
      timestamp: "10:07 AM",
      sender: "You",
    },
    {
      id: 5,
      userId: 1,
      content: "Por supuesto, aquí está el documento.",
      timestamp: "10:10 AM",
      sender: "Carlos Gómez",
      attachments: [
        {
          type: "document",
          url: "https://imgv2-1-f.scribdassets.com/img/document/427779529/original/d320f93511/1?v=1",
        },
      ],
    },
    {
      id: 6,
      userId: 2,
      content:
        "Gracias. Lo revisaré y te daré una respuesta en breve. Mientras tanto, ¿el arrendador ha mencionado algo sobre una penalización?",
      timestamp: "10:15 AM",
      sender: "You",
    },
    {
      id: 7,
      userId: 1,
      content:
        "Sí, mencionó que tendría que pagar los meses restantes o encontrar un nuevo inquilino.",
      timestamp: "10:18 AM",
      sender: "Carlos Gómez",
    },
    {
      id: 8,
      userId: 2,
      content:
        "Entiendo. Déjame revisar el contrato y en unos minutos te daré una orientación sobre tus opciones legales.",
      timestamp: "10:20 AM",
      sender: "You",
    },
  ];

  return (
    <div
      style={{ height: "calc(100vh - 144px)" }}
      className=" flex h-screen bg-white rounded-md mx-auto max-w-7xl text-gray-700"
    >
      <SidebarChats
        users={users}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatArea messages={messages} selectedChat={selectedChat} />
      <InfoPanel chat={selectedChat} mediaItems={mediaItems} />
    </div>
  );
}
