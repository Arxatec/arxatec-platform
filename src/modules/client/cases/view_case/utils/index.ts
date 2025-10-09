import type { Message } from "@/types";
import { formatDate } from "date-fns";

export const groupMessagesByDate = (messages: Message[]) => {
  const grouped: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    const dateKey = formatDate(message.created_at, "yyyy-MM-dd");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(message);
  });

  return grouped;
};
