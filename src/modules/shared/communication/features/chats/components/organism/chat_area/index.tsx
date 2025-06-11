import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import type { Message, User } from "../../../types";
import { CustomAvatar, CustomInput, PrimaryButton } from "~/components/atoms";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import {
  ArrowPathIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
  LinkIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Scrollbars from "react-custom-scrollbars-2";

interface Props {
  messages: Message[];
  selectedChat: User | null;
  handleOpenInfo: () => void;
}

export const ChatArea: React.FC<Props> = ({
  messages,
  selectedChat,
  handleOpenInfo,
}) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center flex-col justify-center text-gray-500 bg-white rounded-lg shadow-sm transition-all hover:shadow-lg">
        <div className="w-full p-8 h-full flex items-center justify-center gap-4 flex-col">
          <div className="size-24  rounded-xl border-2 border-gray-200 border-dashed grid place-items-center  ">
            <ChatBubbleOvalLeftIcon className="size-10 text-gray-300" />
          </div>
          <h2 className="text-gray-400 text-base text-center">
            Selecciona un chat para ver sus conversaciones.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col ">
      <div className="px-4 py-3 flex items-center justify-between mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center space-x-2">
          <CustomAvatar
            avatar={selectedChat.avatar || "/placeholder.svg"}
            username={selectedChat.name}
            size="2.5rem"
          />
          <div>
            <span className="font-bold text-sm text-gray-700 block">
              {selectedChat.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          {selectedChat.id !== 0 && (
            <button
              className="p-1 hover:bg-gray-100 rounded-full transition-all"
              onClick={handleOpenInfo}
            >
              <EllipsisVerticalIcon className="size-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto  bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
        <Scrollbars autoHide>
          <div className="p-4 space-y-4">
            {selectedChat.id === 0 && (
              <div className="w-full">
                <h2 className="text-3xl font-black tracking-tight inline-flex animate-text-gradient bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#1e40af] bg-[200%_auto] bg-clip-text text-transparent">
                  Hola Rafael <br /> ¿En que te puedo ayudar hoy?
                </h2>
                <p className="w-full max-w-96 mt-4 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  quis, libero exercitationem repellendus.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button className="border border-gray-100 rounded-lg p-2.5 w-56 h-32 flex justify-between flex-col hover:bg-gray-50 transition-all">
                    <p className="text-sm text-gray-800 font-semibold text-left">
                      ¿Podrias resumir el caso que te voy a enviar?
                    </p>
                    <DocumentIcon className="size-5 text-gray-500 mt-4" />
                  </button>
                  <button className="border border-gray-100 rounded-lg p-2.5 w-56 h-32 flex justify-between flex-col hover:bg-gray-50 transition-all">
                    <p className="text-sm text-gray-800 font-semibold text-left">
                      ¿Podrias analizar todos los casos de mis clientes?
                    </p>
                    <SparklesIcon className="size-5 text-gray-500 mt-4" />
                  </button>
                  <button className="border border-gray-100 rounded-lg p-2.5 w-56 h-32 flex justify-between flex-col hover:bg-gray-50 transition-all">
                    <p className="text-sm text-gray-800 font-semibold text-left">
                      ¿Podrias darme información sobre mis clientes?
                    </p>
                    <UsersIcon className="size-5 text-gray-500 mt-4" />
                  </button>
                </div>
                <PrimaryButton className="mt-2 px-4 bg-white text-gray-500 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 shadow-none font-normal">
                  <ArrowPathIcon className="size-4 text-gray-500" />
                  Recargar sugerencias
                </PrimaryButton>
              </div>
            )}
            {selectedChat.id !== 0 && (
              <div className="flex items-center gap-4 mb-4">
                <div className="w-full h-[1px] bg-gray-300 flex-1" />
                <p className="text-sm text-gray-600 flex-initial ">
                  Te conectaste con {selectedChat.name}
                </p>
                <div className="w-full h-[1px] bg-gray-300 flex-1" />
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col space-y-1 text-sm ${
                  message.sender === "You" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-600">
                    {message.timestamp}
                  </span>
                </div>
                <div
                  className={`rounded-lg p-3 max-w-md text-sm ${
                    message.sender === "You"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-gray-700"
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
        </Scrollbars>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between gap-2 h-full">
          <div className="w-full h-full">
            <CustomInput
              type="text"
              placeholder="Escribe tu mensaje..."
              className="py-3 ring-0 rounded-lg hover:shadow-md transition-all pl-4 pr-10"
              endAdornment={
                <div className="h-full flex items-center gap-3">
                  <button>
                    <LinkIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="h-full">
                    <FaceSmileIcon className="size-5 text-gray-400" />
                  </button>
                </div>
              }
            />
          </div>

          <button className=" w-12 h-full flex justify-center items-center  bg-blue-600 hover:bg-blue-700 transition-all rounded-lg group">
            <PaperAirplaneIcon className="size-5 text-white group-hover:-rotate-[25deg] transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
