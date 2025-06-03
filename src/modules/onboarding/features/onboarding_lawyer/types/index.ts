export interface LawyerProfileFormData {
  profilePicture: string;
  bio: string;
  location: string;
  gender: "male" | "female";
  birthDate: Date | null;
}

export interface ProfessionalInfoFormData {
  speciality: {
    id: number;
    name: string;
  };
  experience: {
    id: number;
    name: string;
  };
  education: string;
}

export interface AvailabilityFormData {
  schedule: Record<string, { enabled: boolean; slots: string[] }>;
}

export interface PreferencesFormData {
  paymentMethod: {
    id: number;
    name: string;
  };
  idealClient: {
    id: number;
    name: string;
  };
  communicationPreference: {
    id: number;
    name: string;
  };
  virtualConsultations: boolean;
  proBonoWork: boolean;
}

export interface LawyerOnboardingFormData {
  lawyerProfile: LawyerProfileFormData;
  professionalInfo: ProfessionalInfoFormData;
  availability: AvailabilityFormData;
  preferences: PreferencesFormData;
}
