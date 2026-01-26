import { supabase } from '@shared/api';

/**
 * @description theme entity의 타입
 */
export interface Theme {
  id: number;
  name: string;
  slug: string;
}

export const getThemes = async () => {
  const { data, error } = await supabase.from('themes').select('id, name');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data as Pick<Theme, 'id' | 'name'>[];
};
