import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from '@shared/api';

import type {
  ParagraphFilterType,
  ParagraphRow,
} from '../model/paragraph.type';

export async function getParagraphs(
  filter?: ParagraphFilterType,
): Promise<Paged<ParagraphRow>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize,
  );

  let queryBuilder = supabase
    .from('paragraphs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (filter?.q && filter.q.trim() !== '') {
    const searchKeyword = `%${filter.q.trim()}%`;
    queryBuilder = queryBuilder.ilike('title', searchKeyword);
  }

  const response = await queryBuilder.range(from, to);
  const items = unwrap<ParagraphRow[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
