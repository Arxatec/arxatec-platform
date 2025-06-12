export interface LegalCategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface LawyerDTO {
  id: number;
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
  attorneyFees: AttorneyFee[];
  workSchedules: WorkSchedule[];
}

interface Location {
  fullAddress: string;
  latitude: number;
  longitude: number;
}

interface AttorneyFee {
  id?: number;
  amount?: number;
  description?: string;
}

interface WorkSchedule {
  id?: number;
  day?: string;
  startTime?: string;
  endTime?: string;
}
