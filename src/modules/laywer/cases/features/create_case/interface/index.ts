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
  client?: User;
  description: string;
}
