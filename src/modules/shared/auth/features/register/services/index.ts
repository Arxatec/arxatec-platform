import axios from "axios";

export const register = async (
  name: string,
  lastname: string,
  email: string,
  password: string
) => {
  try {
    const createUser = {
      first_name: name,
      last_name: lastname,
      email: email,
      password: password,
      confirm_password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/register/request",
      createUser
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
