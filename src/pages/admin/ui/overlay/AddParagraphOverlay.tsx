import { useState } from 'react';

import { useGenerateSentence } from '@features/ai-generate-sentence';
import { useGenerateSubTopic } from '@features/ai-generate-sub-topic';

import { useParagraphStore } from '@entities/paragraph';
import { getThemeIdBySlug } from '@entities/theme';
import { useThemes } from '@entities/theme/model/use-themes';

import { supabase } from '@shared/api';
import type { Database } from '@shared/api/generated/database';
import { BaseButton, Card } from '@shared/ui';

type SentenceInputType = {
  position: number;
  type: number;
  eng: string;
  kor: string;
};

type SaveArgs =
  Database['public']['Functions']['save_paragraph_with_sentence']['Args'];

type SaveArgsWithTypedSentences = Omit<SaveArgs, 'p_sentences'> & {
  p_sentences: SentenceInputType[];
};

type AddParagraphlOverlayProps = {
  userId: string;
  onClose: () => void;
};
export const AddParagraphOverlay = ({
  userId,
  onClose,
}: AddParagraphlOverlayProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [generatedSubTopics, setGeneratedSubTopics] = useState<string[]>([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState<string | null>(null);

  const { data: themes } = useThemes();
  const paragraphStore = useParagraphStore();

  const paragraphThemeId = useParagraphStore((s) => s.paragraph?.theme_id);

  const derivedTopic =
    selectedTopic ?? themes?.find((t) => t.id === paragraphThemeId)?.slug ?? '';

  const { generate: generateSubTopics, isLoading: isSubTopicLoading } =
    useGenerateSubTopic({
      topic: derivedTopic,
      level: 'Intermediate', // Assuming a fixed level for sub-topic generation
    });

  const { generate: generateSentence, isLoading: isSentenceLoading } =
    useGenerateSentence({
      topic: derivedTopic,
      subTopic: selectedSubTopic ?? '', // Use selectedSubTopic if available, otherwise derivedTopic
      level: 'Intermediate',
      userId,
    });

  const HandleGenerateSubTopics = async () => {
    if (!derivedTopic) return;
    try {
      const { result } = await generateSubTopics();
      setGeneratedSubTopics(result.subtopics);
      setSelectedSubTopic(result.subtopics[0] || null); // Select the first subtopic by default
    } catch (error) {
      console.error('Failed to generate sub-topics:', error);
    }
  };

  const HandleGetGenerateSentence = async () => {
    const { result } = await generateSentence();
    const themeId = await getThemeIdBySlug(result.topic);
    paragraphStore.setParagraph({
      theme_id: themeId,
      title: result.title,
    });
    setSelectedTopic(result.topic); // Update selectedTopic state
    const sentencesToStore = result.sentences.map((sentence) => ({
      sentence_eng: sentence.eng,
      sentence_kor: sentence.kor,
    }));
    paragraphStore.setSentences(sentencesToStore);
  };
  const HandleUpdateSentence = async () => {
    if (!paragraphStore.paragraph) return;
    const themeId = await getThemeIdBySlug(selectedTopic ?? derivedTopic);
    const payload = {
      p_theme_id: themeId,
      p_title: paragraphStore.paragraph.title ?? '',
      p_level: 'Intermediate',
      p_sentences: paragraphStore.sentences.map((sentence, index) => ({
        eng: sentence.sentence_eng,
        kor: sentence.sentence_kor,
        type: sentence.type ?? 0,
        position: index + 1,
      })),
    } satisfies SaveArgsWithTypedSentences;

    /**
    1. sentences 문장 등록
    sentence_eng
    sentence_kor
    type - enum 0: 공통 1:질문 2: 문장
    level
    theme_id enum 0:

    2. paragraphs 등록
    title
    theme_id

    3. paragraph_sentences 등록
    paragraph_id
    sentence_id
    position
    TODO: insert 할 때 type error 있음!
      */
    const { data, error } = await supabase.rpc(
      'save_paragraph_with_sentence',
      payload,
    );
    if (error) console.error(error);
    else console.log(data);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm  max-h-[80dvh] rounded-2xl bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>문단 추가</h1>
        <Card>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>주제:</p>
              <select
                value={derivedTopic}
                onChange={(e) => {
                  const slug = e.target.value;
                  setSelectedTopic(slug);
                  setGeneratedSubTopics([]); // Reset subtopics
                  setSelectedSubTopic(null); // Reset selected subtopic

                  const selectedTheme = themes?.find((t) => t.slug === slug);
                  if (selectedTheme) {
                    paragraphStore.setParagraph({
                      ...paragraphStore.paragraph!,
                      theme_id: selectedTheme.id,
                    });
                  }
                }}
              >
                <option value="">주제를 선택하세요</option>
                {themes?.map((theme) => (
                  <option key={theme.id} value={theme.slug}>
                    {theme.slug}
                  </option>
                ))}
              </select>
            </div>

            {derivedTopic && (
              <>
                <BaseButton
                  onClick={HandleGenerateSubTopics}
                  disabled={isSubTopicLoading || !derivedTopic}
                >
                  AI로 세부 주제 생성하기
                </BaseButton>

                {generatedSubTopics.length > 0 && (
                  <div className="flex items-center gap-2">
                    <p>세부 주제:</p>
                    <select
                      value={selectedSubTopic || ''}
                      onChange={(e) => setSelectedSubTopic(e.target.value)}
                    >
                      {generatedSubTopics.map((subtopic) => (
                        <option key={subtopic} value={subtopic}>
                          {subtopic}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            <BaseButton
              onClick={HandleGetGenerateSentence}
              disabled={isSentenceLoading || !selectedSubTopic}
            >
              AI로 문단 생성하기
            </BaseButton>
          </div>

          {paragraphStore.paragraph && (
            <>
              <article className="h-100 m-2 overflow-scroll">
                <p>제목: {paragraphStore.paragraph.title}</p>
                <ul>
                  {paragraphStore.sentences.map((sentence, index) => (
                    <li key={index}>
                      <span>{sentence.sentence_eng}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <BaseButton
                onClick={HandleUpdateSentence}
                disabled={isSentenceLoading}
              >
                문단 세트 저장하기
              </BaseButton>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
