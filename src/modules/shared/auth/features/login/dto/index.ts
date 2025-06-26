export interface LoginDto {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
  };
  token: string;
}
