export { Chat } from "./chat";
export { ChatInput } from "./chat-input";
export { ChatMessage } from "./chat-message";
export { TypingIndicator } from "./typing-indicator";

// Re-export types for convenience
export type {
  Message,
  ChatQuestions,
  ChatbotProps,
  ChatProps,
  ChatState,
  ChatInputProps,
  ChatMessageProps,
  BotResponse,
  GeminiResponse,
} from "../types";

// Re-export configuration
export { DEFAULT_CONTEXTS, CHATBOT_CONFIG } from "../config";
