export interface Article {
  id: string;
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

export interface ArticlesResponse {
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

export interface GetArticlesParams {
  page: number;
  limit: number;
  search?: string;
}
