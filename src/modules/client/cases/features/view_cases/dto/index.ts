export interface PersonalCasesDto {
  cases: Case[];
  user: User;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  user_type: "client" | "lawyer";
  status: string;
  clientDetails: ClientDetails | null;
  // TODO: Change this or delete User
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lawyerDetails: any | null;
}

interface ClientDetails {
  client_id: number;
  budget_range: string;
  urgency_level: string;
  requirement_type: string | null;
  occupation: string;
}

interface Case {
  id: number;
  title: string;
  status_id: number;
  category_id: number;
  is_public: boolean;
  created_at: string;
}
