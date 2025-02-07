import { useState } from "react";
import type { Message, User, MediaItem } from "../../types";
import { ChatArea, InfoPanel, SidebarChats } from "../organism";

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<User | null>(null);

  const users: User[] = [
    {
      id: 1,
      name: "Design Team",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-01-22%20a%20la(s)%204.25.38%E2%80%AFp.%C2%A0m.-SmLK1p3674z2OrAxGsRhMY6kIf8eGD.png",
      isGroup: true,
      members: 12,
      online: 5,
      description: "We're passionate about creating digital product design.",
    },
    // Add more users as needed
  ];

  const messages: Message[] = [
    {
      id: 1,
      userId: 1,
      content: "¡Hola! ¿Cómo va el proyecto de diseño?",
      timestamp: "9:00 AM",
      sender: "Putri Tanjak",
    },
    {
      id: 2,
      userId: 2,
      content:
        "¡Hola Putri! El proyecto va muy bien. Acabo de terminar los mockups.",
      timestamp: "9:05 AM",
      sender: "You",
    },
    {
      id: 3,
      userId: 1,
      content: "¡Genial! ¿Puedes compartir una vista previa?",
      timestamp: "9:10 AM",
      sender: "Putri Tanjak",
    },
    {
      id: 4,
      userId: 2,
      content: "¡Claro! Aquí tienes una vista previa del diseño principal.",
      timestamp: "9:15 AM",
      sender: "You",
      attachments: [
        {
          type: "image",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-01-22%20a%20la(s)%204.25.38%E2%80%AFp.%C2%A0m.-SmLK1p3674z2OrAxGsRhMY6kIf8eGD.png",
        },
      ],
    },
    {
      id: 5,
      userId: 1,
      content:
        "¡Se ve increíble! Me encanta cómo has integrado nuestro nuevo esquema de colores.",
      timestamp: "9:20 AM",
      sender: "Putri Tanjak",
    },
  ];

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: "image",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-01-22%20a%20la(s)%204.25.38%E2%80%AFp.%C2%A0m.-SmLK1p3674z2OrAxGsRhMY6kIf8eGD.png",
    },
    // Add more media items
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
