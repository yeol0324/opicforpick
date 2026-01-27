import { useQuery } from '@tanstack/react-query';

import { getThemes } from '../api/get-themes';

const themeKeys = {
  all: ['themes'] as const,
};

export const useThemes = () => {
  return useQuery({
    queryKey: themeKeys.all,
    queryFn: getThemes,
    staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 fresh 상태로 유지
  });
};
