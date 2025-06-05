interface Location {
  fullAddress: string;
  latitude: number;
  longitude: number;
}

interface WorkSchedule {
  id: number;
  lawyer_id: number;
  day: string;
  open_time: string;
  close_time: string;
}

export interface Lawyer {
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
  location: Location;
  communicationPreference: string;
  attorneyFees: any[];
  workSchedules: WorkSchedule[];
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
