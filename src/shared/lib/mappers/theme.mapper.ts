import { useMemo } from 'react';

import { useThemes } from '@entities/theme/model/use-themes';

/**
 * 테마 데이터를 사용하기 쉬운 맵과 함수 형태로 변환하는 Hook
 * @returns {object} {
 *   topicToThemeIdMap: { [key: string]: number },
 *   getThemeIdByTopic: (topic: string) => number | undefined,
 *   isLoading: boolean,
 *   isError: boolean,
 * }
 */
export const useThemeMapper = () => {
  const { data: themes, isLoading, isError } = useThemes();

  const topicToThemeIdMap = useMemo(() => {
    if (!themes) return {};
    return themes.reduce(
      (acc, theme) => {
        acc[theme.name] = theme.id;
        return acc;
      },
      {} as { [key: string]: number },
    );
  }, [themes]);

  const getThemeIdByTopic = useMemo(() => {
    // map 객체를 기반으로 검색 함수를 생성
    return (topic: string): number | undefined => {
      return topicToThemeIdMap[topic];
    };
  }, [topicToThemeIdMap]);

  return {
    topicToThemeIdMap,
    getThemeIdByTopic,
    isLoading,
    isError,
  };
};
