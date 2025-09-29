export interface ResendRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}
