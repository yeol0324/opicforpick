import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from '@shared/api';

import type { SentenceFilterType, SentenceRow } from '../model/sentence.type';

export async function getSentences(
  filter?: SentenceFilterType,
): Promise<Paged<SentenceRow>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize,
  );

  let queryBuilder = supabase
    .from('sentences')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (filter?.id) {
    queryBuilder = queryBuilder.eq('id', filter.id);
  }
  if (filter?.type !== undefined) {
    queryBuilder = queryBuilder.eq('type', filter.type);
  }
  if (filter?.q && filter.q.trim() !== '') {
    const searchKeyword = `%${filter.q.trim()}%`;
    queryBuilder = queryBuilder.ilike('sentence_eng', searchKeyword);
  }

  const response = await queryBuilder.range(from, to);
  const items = unwrap<SentenceRow[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
