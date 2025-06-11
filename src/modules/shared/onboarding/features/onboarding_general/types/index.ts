export enum ROLE {
  ADMIN = "admin",
  LAWYER = "lawyer",
  CUSTOMER = "customer",
}
export interface Form {
  role: ROLE | null;
}
