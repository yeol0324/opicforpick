import type {
  ParagraphRow,
  ParagraphWithSentenceType,
} from '@entities/paragraph';
import type { SentenceRow } from '@entities/sentence';

import { supabase, unwrap } from '@shared/api';

export async function getParagraphWithSentences(
  paragraphId: string,
): Promise<ParagraphWithSentenceType> {
  const paragraphRes = await supabase
    .from('paragraphs')
    .select('*')
    .eq('id', paragraphId)
    .single();

  const paragraph = unwrap<ParagraphRow>(paragraphRes);

  const sentencesRes = await supabase
    .from('paragraph_sentences')
    .select('sentences(*)')
    .eq('paragraph_id', paragraphId)
    .order('position', { ascending: true });

  const rows = unwrap<{ sentences: SentenceRow }[]>(sentencesRes);
  const sentenceList = rows.flatMap((item) => item.sentences);

  return {
    paragraph,
    sentenceList,
  };
}
