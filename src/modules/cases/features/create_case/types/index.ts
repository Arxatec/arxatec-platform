export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: T;
}
