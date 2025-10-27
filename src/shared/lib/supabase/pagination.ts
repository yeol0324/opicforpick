import type { Paged } from "@shared/lib";
import { APP } from "@shared/lib/constants/app";

export function calculatePagination(page?: number, pageSize?: number) {
  const normalizedPage = Math.max(1, page ?? 1);
  const normalizedPageSize = Math.max(1, pageSize ?? APP.DEFAULT_PAGE_SIZE);
  const from = (normalizedPage - 1) * normalizedPageSize;
  const to = from + normalizedPageSize - 1;

  return {
    page: normalizedPage,
    pageSize: normalizedPageSize,
    from,
    to,
  };
}

export function createPagedResult<T>(params: {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}): Paged<T> {
  const { items, total, page, pageSize } = params;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return {
    items,
    total,
    page,
    pageSize,
    pageCount,
  };
}
