export interface Client {
  id: string;
  profile_image: string | null;
  full_name: string;
  email: string | null;
  phone: string;
  dni: string;
  created_at: Date;
  archived: boolean;
}
