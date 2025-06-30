export interface CaseData {
  id: number;
  title: string;
  category_id: number;
  status_id: number;
  created_at: string;
}

export interface CasesApiResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: CaseData[];
}
