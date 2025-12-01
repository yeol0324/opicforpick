# 오픽포픽 OpicForPick

[LINK](https://opicforpick-web.vercel.app/)

영어 오픽 대비를 위한 학습 웹앱.  
React + Vite + TypeScript + Supabase 기반으로 개발되었습니다.

## 프로젝트 구조

FSD 패턴 기반으로 구조화되어 유지보수가 쉽고 확장에 유리하도록 설계했습니다.

```
api/                    # Vercel Serverless Functions
src/
├─ app/                 # App root, Layout, Routing, Providers
├─ entities/            # "도메인 모델" 단위 (auth, sentence 등)
│  ├─ auth/
│  │   ├─ model/             # 타입, context, 도메인 상태, 인증 규칙
│  │   ├─ api/               # 도메인 관련 API 호출 모음
│  │   ├─ lib/               # 도메인이 사용하는 계산/헬퍼
│  │   ├─ ui/                # 도메인 전용 UI 컴포넌트
│  │   └─ config/            # 도메인의 설정값/상수
│  │
│  ...  # 다른 도메인도 동일하며 필요한 segment만 사용
│  └─ sentence/
│
├─ features/                 # "사용자 행동" 단위
│  ├─ ai-feedback/
│  ├─ auth-email/
│  │   ├─ model/             # 이메일 로그인 로직, hooks, action
│  │   ├─ api/               # 로그인/회원가입 API 호출
│  │   ├─ lib/               # 로그인 폼 검증, 인코딩 등 기능 헬퍼
│  │   ├─ ui/                # EmailLoginForm, EmailRegisterForm
│  │   └─ config/            # 이메일 로그인 기능의 설정값/상수
│  │
│  ...  # 다른 도메인도 동일하며 필요한 segment만 사용
│  └─ toggle-favorite/
│
├─ pages/               # 실제 페이지
│  ├─ login/
│  ├─ home/
│  ├─ practice/
│  └─ notes/
│
├─ shared/              # 공통 유틸, API, 스타일, 컴포넌트
│  ├─ api/              # Supabase 클라이언트, HTTP utils
│  ├─ lib/              # device-id, auth-storage, helper functions
│  ├─ ui/               # Button, Spinner 등 공통 컴포넌트
│  └─ styles/           # 글로벌 스타일
```

## 기술 스택

### **Frontend**

- **React 19** + **Vite**
- **TypeScript**
- **FSD(Feature-Sliced Design)** 아키텍처 적용
- **TanStack Query**
- **React Hook Form + Yup**
- **Tailwind CSS v4**

### **Backend / Infra**

- **Supabase**

  - Postgres DB
  - Auth (이메일/데모 로그인)
  - Storage

- **Vercel Serverless Functions**

  - AI 피드백 API : Google Generative AI Gemini 2.0 Flash
  - Sound To Text : Azure speach

발음/문법/어휘/내용 평가 JSON 생성

- **Vercel Hosting**

## Naming

### 1. 전체 구조 용어

- `segments`: `app`, `entities`, `features`, `pages`, `shared` 등 최상위/도메인 단위 폴더를 통칭.
- 이 규칙은 `src` 이하 전체에 적용한다.

### 2. 폴더 / 파일 / 컴포넌트 네이밍

#### 2.1 폴더 이름

- **모든 폴더 이름은 kebab-case**
  - 예시:
    - `src/entities/daily-question`
    - `src/features/ai-feedback`
    - `src/shared/ui`
    - `src/pages/home`

#### 2.2 파일 이름

- **TS/TSX 파일 : camelCase**
- 예시:
  - `useTodaySentence.ts`
  - `sentenceQueries.ts`
  - `recordFlow.ts`

#### 2.3 컴포넌트 이름

- **React 컴포넌트 : PascalCase**
  - 예시:
    - `HomePage.tsx` → `export function HomePage() { ... }`
    - `FeedbackPanel.tsx` → `export function FeedbackPanel() { ... }`

#### 2.4 Hook 이름

- **Hook 함수 이름 : `use` + PascalCase **
  - 예: `useTodaySentence`, `useAiFeedbackFlow`, `useRecordFlow`
- 파일 이름은 **hook 함수명을 그대로 camelCase로 사용**
  - 예:
    - `useTodaySentence.ts`
    - `useAiFeedbackFlow.ts`
    - `useRecordFlow.ts`

### 3. API 함수 네이밍 규칙

> API 호출 함수는 **역할 + 명사** 조합으로 통일.

#### 3.1 CRUD 기본 규칙

- **조회 (GET)**: `get명사`
  - 단일 조회: `getSentence`, `getFeedback`, `getUserProfile`
  - 리스트/페이지네이션: `getSentences`, `getFeedbackHistory`
- **생성 (CREATE)**: `create명사`
  - 예: `createFeedbackRecord`, `createUser`, `createFavorite`
- **수정 (UPDATE)**: `update명사`
  - 예: `updateSentence`, `updateUserProfile`
- **삭제 (DELETE)**: `delete명사`
  - 예: `deleteFavorite`, `deleteFeedback`

#### 3.2 도메인 확장 규칙 (상세 행동이 필요한 경우)

- 의미가 명확해지도록 **도메인 + 동작** 조합 사용
  - 외부 AI 호출: `requestFeedbackExternal`,`requestTranscribe`
  - STT: `sttFromBlob`, `sttFromMic`,
  - 특수 조회: `getDailySentence`, `getRandomSentence`

> 원칙:
>
> - **DB를 읽어오는 것** → `get*`
> - **DB에 새로 저장** → `create*`
> - **DB 레코드를 수정** → `update*`
> - **DB 레코드를 삭제** → `delete*`
> - **외부 서비스 호출** (AI, STT 등) → `request*`, 도메인 붙여서 명확히

## TanStack Query

**"도메인"과 "사용 흐름"을 분리하는 FSD 원칙**에 맞춰 TanStack Query 사용.

### 1. Query 구조

- **entities**

  - API 호출(get/create/update/delete)
  - queryKey & queryOptions 정의
  - 도메인 로직만 포함

- **features / pages**

  - useQuery / useMutation 실행
  - 여러 API 연결(플로우) 담당
  - UI 상태 관리

→ **entities는 데이터 소스 정의**,
→ **features/pages는 그 데이터를 어떻게 쓸지를 정의**

### 2. Naming

#### **queryKey**

```ts
sentenceKeys = {
  list: (f) => ["sentence", "list", f],
  daily: (level) => ["sentence", "daily", level],
  detail: (id) => ["sentence", "detail", id],
};
```

#### **queryOptions**

```ts
export const sentenceQueries = {
  daily: (level) =>
    queryOptions({
      queryKey: sentenceKeys.daily(level),
      queryFn: () => getDailySentence(level),
      staleTime: 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }),
};
```

#### **useQuery**

```ts
const { data } = useQuery(sentenceQueries.daily());
```

---

### 3. Mutation

- **entities**에서는 단일 API 동작만 수행

```ts
export async function createFeedbackRecord(...) { ... }
```

- **features** 여러 API를 묶어 하나의 플로우 제공

```ts
export function useAiFeedbackFlow() {
  return useMutation(async (payload) => {
    const result = await requestFeedbackExternal(payload);
    await createFeedbackRecord({ ...result, ...payload });
    return result;
  });
}
```

### 4. staleTime 기본 전략

- Daily Sentence: **24시간 / refetch 없음**
- 리스트: **30초 ~ 1분**
- 즉시성 데이터(STT): **0**

### 5. 요약

- **entities = query 정의 / data source**
- **features/pages = useQuery / useMutation 실행 + 비즈니스 흐름**
- **queryKey는 도메인 단위**, **queryOptions는 entities로 모으기**

## 🤖 AI 피드백 기능 (Serverless)

Vercel Serverless + Google Gemini 2.0 Flash 사용

### 흐름

1. 사용자가 녹음 → STT 변환
2. transcript + 질문 + 유저 레벨 → 서버 전송
3. AI가 아래 항목 평가

   - Pronunciation (STT 추정 기반)
   - Grammar
   - Vocabulary
   - Content relevance

4. JSON으로만 결과 반환
5. Supabase DB에 저장 (하루 1회 제한 예정)

### API 예시

```
POST /api/ai-feedback
{
  question: "Tell me about your hometown",
  transcript: "I live in...",
  level: "Intermediate"
}
```

## 핵심 기능

### 랜덤 OPIC 질문 제시

- 레벨 선택: Beginner / Intermediate / Advanced
- Supabase 쿼리로 매일 하나의 주제 선택

### 녹음 / 재생 기능

- MediaRecorder API 적용
- 디바이스별 대응 처리

### AI 말하기 피드백

- 발음, 문법, 어휘, 내용 평가
- JSON 기반 구조화된 결과 제공

### 즐겨찾기 / 노트 기능

- 문장 & 문단 즐겨찾기
- notes 페이지에서 전체 확인

## 🚀 실행

### 1. 레포 클론

```bash
git clone https://github.com/yourname/opicforpick.git
cd opicforpick
```

### 2. 환경 변수 설정

루트에 `.env` 파일 생성

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

AZURE_SPEECH_KEY=
AZURE_SPEECH_REGION=

GEMINI_API_KEY=


GITHUB_OWNER=
GITHUB_REPO=
GITHUB_TOKEN=
```

### 3. 패키지 설치 및 로컬 개발 서버 실행

```bash
pnpm install

pnpm dev     # vite
vercel dev   # Serverless Functions 실행

```

http://localhost:5173
