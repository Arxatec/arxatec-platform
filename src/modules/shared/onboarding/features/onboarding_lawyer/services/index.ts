import axios from "axios";

export const createLawyer = async (formData: FormData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/lawyers/register",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al crear el cliente");
  }
};
