import axios from "axios";

export const createArticle = async (formData: FormData) => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
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

export const updateArticle = async (formData: FormData, id: string) => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
    const response = await axios.patch(
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

export const getAllCategories = async () => {
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
