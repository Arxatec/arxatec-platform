export interface User {
  id: number;
  name: string;
  avatar: string;
  isGroup?: boolean;
  members?: number;
  online?: number;
  description?: string;
}

export interface Message {
  id: number;
  userId: number;
  content: string;
  timestamp: string;
  sender: string;
  attachments?: Array<{
    type: string;
    url: string;
  }>;
}

export interface MediaItem {
  id: number;
  type: string;
  url: string;
}
