export interface CaseModel {
  cases: Case[];
}

interface Case {
  id: number;
  title: string;
  status_id: number;
  category_id: number;
  is_public: boolean;
  created_at: string;
}
