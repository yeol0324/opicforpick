# 오픽포픽 (OpicForPick)

> **"AI와 함께 준비하는 오픽(OPIc) 학습 플랫폼"**
> 녹음을 넘어, AI 피드백을 통해 문법, 어휘, 발음을 연습합니다.

[실행 중인 서비스 보기](https://opicforpick-web.vercel.app/)

## 🧠 설계 및 구현 포인트

### 1. FSD(Feature-Sliced Design) 아키텍처

계층 간의 참조 방향을 강제하여 의존성 관리:

- **Entities vs Features**: `sentence` 엔티티는 데이터 조회만, `ai-feedback` 피처는 비즈니스 로직 담당
- **Shared 독립성**: UI 컴포넌트와 유틸리티는 상위 계층에서만 사용

### 2. TanStack Query 서버 상태 관리

- **Query Key Factory**: 타입 안전한 쿼리 키 관리

  ```typescript
  const sentenceKeys = {
    all: () => ['sentences'] as const,
    daily: (level: ProficiencyLevel) => [...sentenceKeys.all(), 'daily', level] as const,
  };
  ```

- **StaleTime 최적화**: 데이터 성격에 맞는 캐싱 전략
  - 일일 질문: `staleTime: 24시간` - 매일 변경되므로 하루 캐싱
  - 피드백: `staleTime: 60초` - 실시간성 필요

- **Mutation Flow**: 복잡한 API 플로우를 Custom Hook으로 캡슐화
  ```typescript
  // AI 호출 → 파일 업로드 → DB 저장을 하나의 훅으로
  export function useFeedback() {
    return useMutation({
      mutationFn: async (params) => {
        const feedback = await requestFeedback(params);
        const audioPath = await uploadRecording(params.audioBlob);
        await createRecording({ audioPath, ...params });
        return feedback;
      }
    });
  }
  ```

## 🎨 디자인 시스템

### Tailwind CSS v4 아키텍처

**CSS 기반 테마 시스템** `@theme` 블록으로 디자인 토큰 관리

```
src/shared/styles/
├── theme.css          # 색상, 그림자
├── typography.css     # 폰트, 크기
├── animations.css     # 키프레임
└── global.css         # 레이아웃 변수
```

---

## 📦 컴포넌트 생성 규칙

### 구조 분해 패턴으로 className 덮어쓰기 방지

```tsx
export function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn bg-brand ${className}`}>
      {children}
    </button>
  );
}
```

**원칙:**

- `children`, `className` 명시적 추출
- 템플릿 리터럴로 className 안전 조합
- 디폴트 값 설정

---

## 🛠 기술 스택

| 분류         | 기술                       | 이유                                                    |
| ------------ | -------------------------- | ------------------------------------------------------- |
| **Frontend** | React 19, Vite, TS         | 최신 리액트 생태계 활용 및 타입 안정성                  |
| **State**    | TanStack Query             | 서버 상태 동기화 및 캐싱 자동화                         |
| **Style**    | Tailwind CSS v4            | 유틸리티 퍼스트를 통한 빠른 UI 개발 및 번들 크기 최적화 |
| **Backend**  | Supabase, Vercel Functions | 인프라 관리 비용 최소화 및 빠른 Serverless API 구축     |
| **AI/ML**    | Gemini 2.5, Azure Speech   | LLM 피드백 및 STT 엔진                                  |

## 🎯 핵심 기능

- **레벨 맞춤형 질문**: 타겟 레벨에 최적화된 문항 제공
- **다각도 AI 평가**: 발음, 문법, 어휘, 내용 적절성 진단
- **지능형 단어장**: 피드백에서 단어 자동 추출 및 저장
- **연습 문단**: 다양한 주제의 영어 말하기 연습
