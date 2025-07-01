import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import type { ChatInputProps } from "../../types";

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="flex items-center rounded-md border border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Escribir mensaje..."
          className="flex-1 py-1 px-2 outline-none text-sm"
          disabled={disabled}
        />
        <button
          type="submit"
          className={`p-2 rounded-r-md ${
            input.trim() && !disabled
              ? "bg-gray-700 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
          disabled={!input.trim() || disabled}
          aria-label="Enviar mensaje"
        >
          <PaperAirplaneIcon className="size-4 " />
        </button>
      </div>
    </form>
  );
};
