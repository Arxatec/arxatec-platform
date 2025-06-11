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
  linkedin: string;
  identificationNumber: string;
}

export interface AvailabilityFormData {
  schedule: Record<
    string,
    {
      enabled: boolean;
      timeSlots: Array<{
        start: string;
        end: string;
      }>;
    }
  >;
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
  currency: {
    id: number;
    name: string;
  };
}

export interface LawyerOnboardingFormData {
  lawyerProfile: LawyerProfileFormData;
  professionalInfo: ProfessionalInfoFormData;
  availability: AvailabilityFormData;
  preferences: PreferencesFormData;
}
