export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
