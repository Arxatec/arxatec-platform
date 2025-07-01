import React, { useState, useRef, useEffect } from "react";
import { ChatInput, ChatMessage, TypingIndicator } from "..";
import { XMarkIcon, HomeIcon } from "@heroicons/react/16/solid";
import { initialMessages } from "../../data";
import axios, { AxiosError } from "axios";
import type {
  ChatProps,
  ChatState,
  Message,
  GeminiResponse,
} from "../../types";

// Configuración de la API de Gemini
const API_KEY_GEMINI = import.meta.env.VITE_GEMINI_API_KEY || ""; // Variable de entorno
const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
const GEMINI_URL = `${BASE_URL}${API_KEY_GEMINI}`;

const getBotResponse = async (
  message: string,
  context: string
): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(GEMINI_URL, {
      contents: [
        {
          parts: [
            {
              text:
                `
Eres un abogado con más de 10 años de experiencia en derecho.

Tus respuestas deben estar siempre en formato HTML válido. No uses markdown ni símbolos como "**", solo etiquetas <strong>, <p>, <ul>, etc.

Tu misión es asistir directamente a lo que dice el usuario. Si el mensaje es general, como “¿me puedes ayudar?”, responde amablemente preguntando en qué aspecto específico desea ayuda.

Si el usuario envía un JSON, puede contener información sobre un caso legal (ej. título, categoría, estado, documentos, abogado, horarios, etc.).

Tu comportamiento ante el JSON debe ser:
1. Detectar de qué trata el caso (por ejemplo: "Denuncia por robo").
2. Saludar y preguntar al usuario en qué aspecto desea ayuda con ese caso específico.
3. Solo si el usuario lo pide explícitamente (“analiza el caso”, “haz un informe”, etc.), entonces generas un análisis detallado en HTML.

Nunca digas que no sabes. Siempre intenta ayudar con base en la información proporcionada. No expliques que eres una IA ni hagas aclaraciones innecesarias.

` +
                context +
                "\n\n" +
                message,
            },
          ],
        },
      ],
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error al comunicarse con Gemini:", error);
    return axiosError.message || "Error de conexión con el asistente";
  }
};

export const Chat: React.FC<ChatProps> = ({ setOpenChat, props }) => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: initialMessages,
    isTyping: false,
  });

  const [isHome, setIsHome] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = async (content: string): Promise<void> => {
    setIsHome(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      const botResponseText = await getBotResponse(content, props.context);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        sender: "bot",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
      }));
    }
  };

  return (
    <div className="flex flex-col h-[98%] w-full max-w-full mx-auto rounded-lg shadow-lg overflow-hidden bg-white fixed top-2 left-0 md:top-2 md:left-2 z-50">
      <div className="p-2 border-b border-gray-100 bg-white flex items-center justify-between">
        <div className="flex items-center ">
          {!isHome && (
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => setIsHome(true)}
              aria-label="Ir al inicio"
            >
              <HomeIcon className="size-5 text-gray-600" />
            </button>
          )}
          <p className="text-sm font-semibold text-gray-600 ml-2">
            {props.name}
          </p>
        </div>

        <button
          className="p-1 rounded-full hover:bg-gray-100 transition-all"
          onClick={() => setOpenChat(false)}
          aria-label="Cerrar chat"
        >
          <XMarkIcon className="size-5 text-gray-600" />
        </button>
      </div>

      {isHome ? (
        <div className="flex-1 p-4 overflow-y-auto bg-white flex items-center justify-center relative">
          <div className="absolute bottom-0 w-full h-full z-0 "></div>
          <div className="relative z-10 ">
            <h1 className="text-xl font-bold text-gray-700 text-center whitespace-pre-line">
              {props.title}
            </h1>
            <div className="flex items-center gap-2 justify-centerk mt-6 flex-wrap">
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question1)}
              >
                {props.questions.question1}
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question2)}
              >
                {props.questions.question2}
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question3)}
              >
                {props.questions.question3}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-white w-full">
          <div className="flex-1 p-4 w-full max-w-4xl mx-auto">
            {chatState.messages.slice(1).map((message) => (
              <ChatMessage key={message.id} message={message} props={props} />
            ))}
            {chatState.isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isTyping}
      />
    </div>
  );
};
