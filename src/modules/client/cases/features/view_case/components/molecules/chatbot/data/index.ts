import type { Message } from "../types";

export const initialMessages: Message[] = [
  {
    id: "1",
    content: "How can I help you?",
    sender: "bot" as const,
    timestamp: new Date(),
  },
];
