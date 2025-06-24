export interface LegalCategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface ClientDTO {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  location: {
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
  occupation: string;
  gender: string;
  birthDate: string;
  budget: string;
  urgencyLevel: string;
  communicationPreference: string;
}

export interface CreateCaseDTO {
  title: string;
  category_id: number;
  description: string;
  urgency: string;
  is_public?: boolean;
  selected_lawyer_id?: number;
}
