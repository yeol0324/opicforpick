import { applyPaginationDefaults, type PaginationFilter } from './pagination';

export function buildListKey<TFilter extends PaginationFilter>(
  baseKey: readonly unknown[],
  filter?: TFilter,
) {
  const { page, pageSize } = applyPaginationDefaults(filter);

  return [
    ...baseKey,
    'list',
    {
      ...(filter ?? {}),
      page,
      pageSize,
    },
  ] as const;
}
