import { supabase } from '@shared/api';

export const getThemeIdBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('themes')
    .select('id')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data.id;
};
