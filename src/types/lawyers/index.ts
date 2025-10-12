export interface Lawyer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  profile_image: string | null;
  lawyer_details: {
    lawyer_id: string;
    license_number: string;
    specialty: string;
    experience: number;
    biography: string;
    linkedin: string;
  };
}
