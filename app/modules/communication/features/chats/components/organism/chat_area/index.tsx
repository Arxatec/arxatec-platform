import { PaperAirplaneIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import type { Message, User } from "../../../types";
import { CustomInput } from "~/components/atoms";
import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/16/solid";

interface ChatAreaProps {
  messages: Message[];
  selectedChat: User | null;
}

export const ChatArea = ({ messages, selectedChat }: ChatAreaProps) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Selecciona un chat para comenzar a enviar mensajes
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={selectedChat.avatar || "/placeholder.svg"}
            alt={selectedChat.name}
            className="size-12 rounded-full"
          />
          <div>
            <span className="font-bold text-base text-gray-700 block">
              {selectedChat.name}
            </span>
            <span className="text-sm text-gray-500 block">
              12 miembros, 6 en línea
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <PhoneIcon className="size-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <VideoCameraIcon className="size-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
            <EllipsisVerticalIcon className="size-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col space-y-1 text-sm ${
              message.sender === "You" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{message.sender}</span>
              <span className="text-xs text-gray-600">{message.timestamp}</span>
            </div>
            <div
              className={`rounded-lg p-3 max-w-md text-sm ${
                message.sender === "You"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-gray-700"
              }`}
            >
              <p>{message.content}</p>
              {message.attachments?.map((attachment, index) => (
                <img
                  key={index}
                  src={attachment.url || "/placeholder.svg"}
                  alt="Attachment"
                  className="mt-2 rounded-lg w-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-full">
            <CustomInput type="text" placeholder="Escribe tu mensaje..." />
          </div>
          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-all">
            <MicrophoneIcon className="w-5 h-5" />
          </button>
          <button className="p-1 text-blue-600 hover:bg-blue-100 transition-all rounded-full">
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
