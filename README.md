# 오픽포픽 (OpicForPick)

> **"AI와 함께 준비하는 오픽(OPIc) 학습 플랫폼"**
> 녹음을 넘어, AI 피드백을 통해 문법, 어휘, 발음을 연습합니다.

[실행 중인 서비스 보기](https://opicforpick-web.vercel.app/)

## 🧠 설계 및 구현 포인트

### 1. FSD(Feature-Sliced Design) 아키텍처의 엄격한 적용

계층 간의 참조 방향(Linear Flow)을 강제하여 의존성이 꼬이는 것을 방지했습니다.

- **Entities vs Features**: 데이터 모델(Entities)과 사용자 행위(Features)를 분리했습니다. 예를 들어, `sentence` 엔티티는 데이터의 형태와 조회 로직만 가지며, 이를 조합해 '피드백을 요청'하는 비즈니스 로직은 `ai-feedback` 피처에서 담당합니다.
  - **예시**:
    - `sentence` 엔티티의 데이터 타입 정의: `src/entities/sentence/model/sentence.type.ts`
    - `sentence` 엔티티의 조회 쿼리 정의: `src/entities/sentence/api/sentence.queries.ts`
    - `ai-feedback` 피처에서 `sentence` 엔티티를 활용하여 피드백 요청 로직 구현: `src/features/ai-feedback/model/use-feedback.ts`
- **Shared의 독립성**: 프로젝트 전반에서 쓰이는 UI 컴포넌트와 유틸리티는 하위 계층에 의존하지 않도록 설계했습니다.
  - **예시**:
    - 공통 UI 컴포넌트 `Spinner`: `src/shared/ui/elements/spinner.tsx`
    - 공통 유틸리티 `formatMmSs`: `src/shared/lib/time/format-duration.ts`
    - 이들은 `src/app/layout.tsx`나 `src/pages/home/ui/home.page.tsx` 등 다양한 상위 계층에서 독립적으로 import 되어 사용됩니다.

### 2. TanStack Query를 활용한 서버 상태 관리 전략

도메인 중심의 쿼리 관리를 지향합니다.

- **Query Key Factory**: 쿼리 키를 객체 형태로 관리하여 오타로 인한 캐싱 오류를 차단했습니다.
  - **예시**: `src/entities/sentence/api/sentence.queries.ts`
  ```typescript
  const sentenceKeys = {
    all: () => ['sentences'] as const,
    list: (filter?: SentenceFilterType) =>
      buildListKey(sentenceKeys.all(), filter),
    daily: (level: ProficiencyLevel) =>
      [...sentenceKeys.all(), 'daily', level] as const,
  };
  ```
- **StaleTime의 최적화**:
  - 매일 바뀌는 '오늘의 질문'은 `24시간`의 staleTime을 부여해 불필요한 API 호출을 막았습니다.
    - **예시**: `src/entities/sentence/api/sentence.queries.ts`
    ```typescript
    daily: (level: ProficiencyLevel = "Advanced") =>
      queryOptions({
        queryKey: sentenceKeys.daily(level),
        queryFn: () => fetchDailySentence(level),
        staleTime: 24 * 60 * 60 * 1000, // 24시간
        refetchOnWindowFocus: false,
      }),
    ```
  - 실시간성이 중요한 STT 결과물은 즉시 만료(`staleTime: 0`)시킵니다. (이 부분은 STT 결과 자체를 쿼리로 캐싱하기보다는, STT 결과를 바탕으로 생성되는 피드백/녹음 데이터를 캐싱하는 방식으로 구현되어 있습니다. 피드백 쿼리의 `staleTime`은 60초로 설정되어 있습니다.)
- **Mutation Flow**: 여러 API가 엮이는 피드백 요청 과정(외부 AI 호출 + DB 저장)을 하나의 Custom Hook으로 UI 코드의 복잡도를 낮췄습니다.
  - **예시**: `src/features/ai-feedback/model/use-feedback.ts`

  ```typescript
  async function feedbackFlow(
    params: UseFeedbackParam & { userId: string | null },
  ): Promise<FeedbackResponse> {
    if (!params.userId) throw new Error('로그인이 필요합니다.');

    const feedback = await requestFeedback({
      /* ... */
    }); // 외부 AI 호출
    const audioPath = await uploadRecording({
      /* ... */
    }); // 녹음 파일 업로드
    const recording = await createRecording({
      /* ... */
    }); // 녹음 메타데이터 저장
    await createFeedback({
      /* ... */
    }); // 피드백 결과 저장

    return feedback;
  }

  export function useFeedback() {
    // ... useMutation 훅 사용
  }
  ```


## 🛠 기술 스택

| 분류         | 기술                       | 이유                                                    |
| ------------ | -------------------------- | ------------------------------------------------------- |
| **Frontend** | React 19, Vite, TS         | 최신 리액트 생태계 활용 및 타입 안정성           |
| **State**    | TanStack Query             | 서버 상태 동기화 및 캐싱 자동화                         |
| **Style**    | Tailwind CSS v4            | 유틸리티 퍼스트를 통한 빠른 UI 개발 및 번들 크기 최적화 |
| **Backend**  | Supabase, Vercel Functions | 인프라 관리 비용 최소화 및 빠른 Serverless API 구축     |
| **AI/ML**    | Gemini 2.5, Azure Speech   | LLM 피드백 및 STT 엔진                    |

## 🎯 핵심 기능

- **레벨 맞춤형 질문**: 사용자의 타겟 레벨(Beginner ~ Advanced)에 최적화된 문항 제공
  - **관련 파일**: `src/features/daily-question/model/use-daily-question.ts`
- **다각도 AI 평가**: 발음, 문법, 어휘 사용량, 내용 적절성 등 4개 영역 진단
  - **관련 파일**: `src/features/ai-feedback/model/use-feedback.ts`, `src/features/ai-feedback/ui/feedback-panel.tsx`
- **지능형 단어장**: 피드백 받은 문장에서 모르는 단어를 추출 및 저장
  - **관련 파일**: `src/features/word-from-feedback/api/save-recommend-words.ts`, `src/features/word-from-feedback/ui/recommend-voca-picker.tsx`
- **연습 문단**: 다양한 주제의 문단을 통해 영어 말하기 연습
  - **관련 파일**: `src/pages/practice/ui/practice.page.tsx`, `src/pages/practice/ui/practice.overlay.tsx`
