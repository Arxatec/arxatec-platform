import axios from "axios";

export const createArticle = async (formData: FormData): Promise<any> => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const response = await axios.post(
      "http://localhost:3000/api/v1/articles",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al crear el artículo");
  }
};

export const updateArticle = async (
  formData: FormData,
  id: string
): Promise<any> => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const response = await axios.put(
      `http://localhost:3000/api/v1/articles/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al actualizar el artículo");
  }
};

export const getAllCategories = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/articles/categories"
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al obtener las categorías");
  }
};

export const getArticleContent = async (contentUrl: string) => {
  try {
    const response = await axios.get(contentUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error?.message || "Error al obtener el contenido del artículo"
    );
  }
};
