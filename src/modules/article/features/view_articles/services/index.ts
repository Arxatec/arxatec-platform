import axiosInstance from "~/interceptors";
import type { ArticlesResponse, GetArticlesParams } from "../models";

export const getArticles = async ({
  page = 1,
  limit = 10,
  search = "",
}: GetArticlesParams): Promise<ArticlesResponse> => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const { data } = await axiosInstance.get<ArticlesResponse>(
      `/api/v1/articles?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error al cargar los artículos");
  }
};
