export type AuthUserMeta = {
  nickname?: string;
};

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};
