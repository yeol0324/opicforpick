# 오픽포픽 OpicForPick

[LINK](https://opicforpick-web.vercel.app/)

영어 오픽 대비를 위한 학습 웹앱.  
React + Vite + TypeScript + Supabase 기반으로 개발되었습니다.

## 📂 프로젝트 구조

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

# 🛠️ 기술 스택

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
  - Sound To Text : Azure STT

발음/문법/어휘/내용 평가 JSON 생성

- **Vercel Hosting**

# 🔐 인증(Authentication) 흐름

### ✅ 이메일 로그인

Supabase Auth + 이메일/비밀번호 방식
회원가입 시 이메일 인증 필요

### ✅ 임시 로그인(데모 계정)

- 포트폴리오 관람자 편의를 위해 제공
- 버튼 클릭 → 인증된 데모 계정으로 자동 로그인
- 별도 가입 필요 없음

---

# 🤖 AI 피드백 기능 (Serverless)

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

---

# 🎤 핵심 기능

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

---

# 🚀 실행 방법 (로컬 개발)

### 1. 레포 클론

```bash
git clone https://github.com/yourname/opicforpick.git
cd opicforpick
```

---

### 2. 환경 변수 설정

루트에 `.env` 파일 생성

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

AZURE_SPEECH_KEY=
AZURE_SPEECH_REGION=

GEMINI_API_KEY=
```

---

### 3. 패키지 설치 및 로컬 개발 서버 실행

```bash
pnpm install

pnpm dev     # vite
vercel dev   # Serverless Functions 실행

```

http://localhost:5173

---

# 🧭 앞으로 추가 예정 기능

- AI 피드백 기록 분석 (Heatmap)
- 오늘의 주제 24시간 고정 기능
- 문단 단위 학습 확대
- 모바일 UX 개선
