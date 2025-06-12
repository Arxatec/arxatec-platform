import type { LawyerModel } from "../models";

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface FormValues {
  title: string;
  category: {
    id: number;
    name: string;
  };
  lawyer?: LawyerModel;
  description: string;
  isPrivate: boolean;
  urgency: {
    id: number;
    name: string;
  };
}
