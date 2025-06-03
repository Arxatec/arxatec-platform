export const rangeAgesData = [
  { id: 0, name: "18-25 años" },
  { id: 1, name: "26-35 años" },
  { id: 2, name: "36-45 años" },
  { id: 3, name: "46-55 años" },
  { id: 4, name: "56-65 años" },
  { id: 5, name: "65+ años" },
];

export const urgenciesData = [
  { id: 0, name: "Urgente" },
  { id: 1, name: "Normal" },
  { id: 2, name: "No urgente" },
];

export const communicationPreferencesData = [
  { id: 0, name: "Teléfono" },
  { id: 1, name: "Email" },
  { id: 2, name: "WhatsApp" },
  { id: 3, name: "Videollamada" },
];

export interface ClientProfileFormData {
  profilePicture: File;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  occupation: string;
  ageRange: {
    id: number;
    name: string;
  };
  gender: "male" | "female";
  birthDate: Date | null;
}

export interface LegalPreferencesFormData {
  budgetRange: number;
  urgency: {
    id: number;
    name: string;
  };
  communicationPreference: {
    id: number;
    name: string;
  };
}

export interface CustomerOnboardingFormData {
  clientProfile: ClientProfileFormData;
  legalPreferences: LegalPreferencesFormData;
}
