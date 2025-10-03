# 오픽포픽 OpicForPick

[LINK](https://opicforpick-web.vercel.app/)


영어 오픽(Oral Proficiency Interview) 대비를 위한 학습 웹앱.  
React + Vite + TypeScript + Supabase 기반으로 개발되었습니다.  

## 📂 프로젝트 구조

```
.
├─ public/               # 정적 파일
├─ src/
│  ├─ app/               # App 진입점, Layout, 라우팅
│  ├─ entities/          # 도메인 단위 모델/상태/api/ui
│  ├─ features/          # 사용자가 수행하는 기능 단위 (랜덤 문장, 즐겨찾기 등)
│  ├─ pages/             # 페이지 컴포넌트
│  ├─ shared/            # 공용 라이브러리, API 클라이언트, 스타일, UI
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ .env

````

---

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript, Vite
- **State/Query**: TanStack Query
- **Form**: React Hook Form + Yup
- **Style**: Tailwind CSS v4
- **Backend**: Supabase (Postgres + Auth + Storage)
- **Infra**: Vercel 배포

---

## 🚀 실행 방법

### 1. 환경 변수 설정
루트에 `.env` 파일 생성:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
````

### 2. 설치 & 실행

```bash
pnpm install
pnpm dev
```

빌드:

```bash
pnpm build
pnpm preview
```

---

## 📌 주요 기능

* 랜덤 문장 학습 (레벨별, 주제별)
* 즐겨찾기 및 노트 기록
* 녹음 및 재생 (추가 기능 예정)

---

## 📜 변경 로그

* **2025-10**: 모노레포(Turborepo) 구조 제거, 단일 웹앱으로 리팩터링
* 이후 기능 추가 예정
