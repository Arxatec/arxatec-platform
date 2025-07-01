import { useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import type { ChatbotProps } from "./types";
import { Chat } from "./components";

interface ChatbotComponentProps {
  props: ChatbotProps;
}

export default function Chatbot({ props }: ChatbotComponentProps) {
  const [openChat, setOpenChat] = useState<boolean>(false);

  return (
    <div>
      <button
        className="fixed bottom-4 left-4 rounded-full bg-blue-600 z-40 p-4 hover:bg-blue-500 transition-all shadow-blue-600 shadow-2xl"
        onClick={() => setOpenChat(!openChat)}
        aria-label="Abrir chat"
      >
        <ChatBubbleLeftIcon className="size-6 text-white" />
      </button>
      {openChat && <Chat setOpenChat={setOpenChat} props={props} />}
    </div>
  );
}
