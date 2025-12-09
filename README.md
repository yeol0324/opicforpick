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
│  └─ my-records/
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

### 1. 변수 / 함수 네이밍 규칙

- **변수/함수**: camelCase (`helloWorld`, `getData`)
- **배열**: 이름 끝에 `List` 접미사 (`userList`)
- **boolean**: `is`, `has`, `can` 접두사 (`isLoading`, `hasPermission`, `canSubmit`)
- **클래스/생성자**: PascalCase (`Book`, `UserService`)
- **상수**: SNAKE_CASE (`MAX_COUNT`, `API_URL`)
- **Enum**: 이름과 내부 값 모두 PascalCase

---

### 2. 함수 접두사 규칙 (의미 기반)

의도를 **이름에서 바로 알 수 있도록** 접두사를 강제한다.

- **boolean 반환**: `is`, `has`, `can` (`isClient`, `hasPermission`)
- **생성**: `create` (`createUser`)
- **변환**: `convert` (`convertToJson`)
- **조회**: `get` (`getUser`, `getDataList`)
- **열기**: `open` (`openModal`)
- **더하기/빼기**: `add`, `minus` (`addItem`, `minusCount`)
- **배열 필터링**: `filter` (`filterActiveUsers`)
- **배열 탐색**: `find` (`findUserById`)
- **기타**: 동사 접두사 필수 (`parseData`, `handleClick`)
- **관행 예외**: 업계 관행 함수는 예외 허용 (`throttle`, `debounce`)

---

### 3. React 규칙

- **Custom Hook**: `use` 접두사 (`useAuth`, `useFetch`)
- **HOC**: `with` 접두사 (`withAuth`)
- **이벤트 핸들러**: `handle` + 이벤트 타입 (`handleButtonClick`, `handleSubmit`) ⚠️ `onClick`, `onChange` 형태 사용 금지
- **Context**: 이름 끝에 `Context` (`AuthContext`)
- **Context Hook**: `use` + `Context` (`useAuthContext`)
- **Provider 컴포넌트**: 이름 끝에 `Provider` (`AuthContextProvider`)
- **Provider 래퍼**: 항상 `Providers` (`Providers`)

---

### 4. 파일 / 폴더 네이밍 규칙

- **파일명/폴더명**: 무조건 kebab-case (`hello-world.tsx`, `user-profile.ts`) ⚠️ 예외 없음
- **허용된 subpath** (1단계만): `*.model.ts`, `*.schema.ts`, `*.factory.ts`, `*.query.ts`, `*.mutation.ts`, `*.test.ts`, `*.page.tsx`, `*.overlay.tsx`, `*.constant.ts`, `*.util.ts`, `*.container.tsx`, `*.present.tsx`, `*.loading.tsx`, `*.type.ts`
- **Subpath 중첩 금지**: ❌ `hello.util.test.ts` → ✅ `hello-util.test.ts`

---

### 5. 폴더 구조 (Feature-Sliced Design)

자세한 구조는 [프로젝트 구조](#프로젝트-구조) 섹션 참조.

- **shared**: 전역 유틸, 공통 UI, 모든 계층에서 사용 가능한 코드
- **entities**: `model | api | ui | lib` - 도메인 모델 단위, query/mutation은 api에 포함
- **features**: 가급적 사용 최소화, entities로 해결 우선
- **widgets**: features와 동일하게 사용 자제
- **pages**: 라우팅 전용, 재사용 금지 (필요 시 shared로 이동)
- **app**: 앱 초기화, provider, router, 전역 설정

---

### 6. API 함수 네이밍 규칙

**역할 + 명사** 조합으로 통일. (일반 함수 접두사 규칙의 확장 적용)

- **조회 (GET)**: `get명사` (`getSentence`, `getSentences`, `getDailySentence`, `getRandomSentence`, `getUserProfile`)
- **생성 (CREATE)**: `create명사` (`createUser`, `createFeedbackRecord`)
- **수정 (UPDATE)**: `update명사` (`updateSentence`, `updateUserProfile`)
- **삭제 (DELETE)**: `delete명사` (`deleteFavorite`, `deleteFeedback`)
- **외부 서비스 호출**: `request*` + 도메인 (`requestFeedbackExternal`, `requestTranscribe`, `sttFromBlob`, `sttFromMic`)

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
- my-records 페이지에서 전체 확인

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
