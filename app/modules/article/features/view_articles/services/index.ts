import axiosInstance from "~/interceptors";

export interface Article {
  id: number;
  user_id: number;
  title: string;
  resume: string;
  reading_time: number;
  content: string;
  banner: string;
  category_id: number;
  publication_timestamp: string;
  status: string;
  userDetails: {
    user: {
      first_name: string;
      last_name: string;
    };
  };
  articleCategory: {
    name: string;
  };
}

interface ArticlesResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: {
    data: Article[];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

interface GetArticlesParams {
  page: number;
  limit: number;
  search?: string;
}

export const getArticles = async ({
  page = 1,
  limit = 10,
  search = "",
}: GetArticlesParams): Promise<ArticlesResponse> => {
  try {
    const token = localStorage.getItem("TOKEN_AUTH");
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
