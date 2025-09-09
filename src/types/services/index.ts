export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface Response<T = void> {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data?: T;
}
