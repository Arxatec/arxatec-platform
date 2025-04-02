export type NotificationType =
  | "document"
  | "user"
  | "meeting"
  | "timeoff"
  | "performance";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  reference?: string;
  avatar?: string;
  isNew?: boolean;
}

export interface NotificationGroup {
  title: string;
  items: NotificationItem[];
}
