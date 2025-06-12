export interface LegalCategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface LawyerDTO {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  licenseNumber: string;
  gender: string;
  birthDate: string;
  specialty: string;
  experience: number;
  biography: string;
  linkedin: string;
  preferredClient: string;
  location: {
    latitude: number;
    longitude: number;
    fullAddress?: string;
  };
  communicationPreference: string;
  attorneyFees: {
    id?: number;
    amount?: number;
    description?: string;
  }[];
  workSchedules: {
    id?: number;
    day?: string;
    startTime?: string;
    endTime?: string;
  }[];
}

export interface CreateCaseDTO {
  title: string;
  category_id: number;
  description: string;
  urgency: string;
  is_public?: boolean;
  selected_lawyer_id?: number;
}
