export interface Message {
  id: string;
  service_id: string;
  content: string;
  sent_by: "client" | "lawyer";
  is_read: boolean;
  created_at: Date;
  sent_name: string;
}
