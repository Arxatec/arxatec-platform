export interface LegalCategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface ClientDTO {
  id: number;
  user_detail_id: number;
  profile_image: string;
  full_name: string;
  email: string;
  phone: string;
  dni: string;
  created_at: string;
  archived: boolean;
}

export interface CreateCaseDTO {
  title: string;
  category_id: number;
  description: string;
  is_public: boolean;
  client_id: number;
}
