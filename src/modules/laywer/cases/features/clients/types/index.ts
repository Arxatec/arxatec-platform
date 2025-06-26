export interface ClientData {
  id: number;
  service_id: number;
  title: string;
  description: string;
  category_id: number;
  urgency: "alta" | "media" | "baja";
  status_id: number;
  is_public: boolean;
  reference_code: string;
  created_at: string;
  archived: boolean;
}

export interface CreateClientRequest {
  full_name: string;
  phone: string;
  dni: string;
  email: string;
  avatar?: File | FileList;
}

export interface ClientsApiResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: ClientData[];
}
