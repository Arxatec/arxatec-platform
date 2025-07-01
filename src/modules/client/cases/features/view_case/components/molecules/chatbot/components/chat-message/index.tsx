import React from "react";
import { ComputerDesktopIcon } from "@heroicons/react/16/solid";
import type { ChatMessageProps } from "../../types";

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, props }) => {
  const isBot = message.sender === "bot";

  const getFormattedTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div
      className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`flex max-w-[80%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {isBot && (
          <div
            className={`flex items-center justify-center size-7 rounded-full ${
              isBot ? "bg-gray-100 text-gray-600 mr-2" : ""
            } `}
          >
            <ComputerDesktopIcon className="size-5" />
          </div>
        )}
        <div className="flex flex-col">
          <p
            className={`text-xs text-gray-500 mb-2 ${
              isBot ? "text-left" : "text-right"
            }`}
          >
            {isBot ? "" : `${props.you}`} {getFormattedTime()}
          </p>
          {isBot ? (
            <div
              dangerouslySetInnerHTML={{ __html: message.content }}
              className={` text-sm bg-white text-gray-600  " `}
            ></div>
          ) : (
            <div
              className={` text-sm px-2 py-1 rounded-tl-md rounded-bl-md rounded-br-md bg-gray-200 text-gray-900 whitespace-pre-line`}
            >
              {message.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
