export interface CaseData {
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

export interface CasesApiResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: CaseData[];
}
