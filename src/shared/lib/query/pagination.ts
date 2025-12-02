export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;

export type PaginationFilter = {
  page?: number;
  pageSize?: number;
};

export function applyPaginationDefaults<T extends PaginationFilter>(
  filter?: T
): T & { page: number; pageSize: number } {
  return {
    ...(filter ?? ({} as T)),
    page: filter?.page ?? DEFAULT_PAGE,
    pageSize: filter?.pageSize ?? DEFAULT_PAGE_SIZE,
  };
}
