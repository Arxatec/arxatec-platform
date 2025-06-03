import axios from "axios";

export interface CustomerResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: {
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
    ageRange: string;
    gender: string;
    birthDate: string;
    budget: number;
    urgencyLevel: string;
    communicationPreference: string;
  };
}

export const createCustomer = async (
  formData: FormData
): Promise<CustomerResponse> => {
  try {
    const response = await axios.post<CustomerResponse>(
      "http://localhost:3000/api/v1/clients/register",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al crear el cliente");
  }
};
