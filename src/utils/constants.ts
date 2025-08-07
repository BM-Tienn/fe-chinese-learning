export enum TYPE_LOCAL_STORAGE {
  URL_REDIRECT = 'default-url-redirect',
  THEME = 'theme',
  USER = 'user',
}

export enum TYPE_COOKIE {
  TOKEN = 'default-token-han-ngu-thong',
  DEVICE_ID = 'default-device-id-han-ngu-thong',
  USER = 'default-user-han-ngu-thong',
}

export type PaginationType = {
  page: number;
  limit: number;
  count: number;
  pageTotal: number;
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5678';
