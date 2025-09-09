export const USER_TYPE = {
  CLIENT: "client",
  LAWYER: "lawyer",
};

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const USER_GENDER = {
  MALE: "male",
  FEMALE: "female",
  UNSPECIFIED: "unspecified",
};

export interface User {
  id: string;
  name: string;
  email: string;
  user_type: typeof USER_TYPE.CLIENT | typeof USER_TYPE.LAWYER;
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  birth_date: string | null;
  gender:
    | typeof USER_GENDER.MALE
    | typeof USER_GENDER.FEMALE
    | typeof USER_GENDER.UNSPECIFIED
    | null;
  user_type: typeof USER_TYPE.CLIENT | typeof USER_TYPE.LAWYER;
  status: typeof USER_STATUS.ACTIVE | typeof USER_STATUS.INACTIVE;
  admin_details: null;
}
