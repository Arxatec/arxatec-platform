import type { ArticlesResponse, GetArticlesParams } from "../models";
import axios from "axios";

export const getArticles = async ({
  page = 1,
  limit = 10,
  search = "",
}: GetArticlesParams): Promise<ArticlesResponse> => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const { data } = await axios.get<ArticlesResponse>(
      `http://localhost:3000/api/v1/articles?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (_) {
    throw new Error("Error al cargar los artículos");
  }
};

export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/articles/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el artículo");
  }
};
