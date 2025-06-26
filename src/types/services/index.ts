export interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}
export interface Response<T = void> {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data?: T;
}
