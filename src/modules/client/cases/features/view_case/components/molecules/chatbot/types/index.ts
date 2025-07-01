export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatQuestions {
  question1: string;
  question2: string;
  question3: string;
}

export interface ChatbotProps {
  name: string;
  title: string;
  questions: ChatQuestions;
  you: string;
  context: string;
}

export interface ChatProps {
  setOpenChat: (open: boolean) => void;
  props: ChatbotProps;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void> | void;
  disabled?: boolean;
}

export interface ChatMessageProps {
  message: Message;
  props: ChatbotProps;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface BotResponse {
  data?: string;
  message?: string;
}
