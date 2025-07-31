# DND 13th 3 Frontend

DND 13th 3 프로젝트의 프론트엔드 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Linting & Formatting**: Biome
- **Package Manager**: npm

<br/>

## 📋 개발 환경 설정

### 필수 요구사항

- Node.js 18.17.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

<br/>

## 🛠️ 개발 도구

### Biome (Linting & Formatting)

이 프로젝트는 [Biome](https://biomejs.dev/)를 사용하여 코드 품질을 관리합니다.

#### 사용 가능한 스크립트

```bash
# 린트 체크
npm run lint

# 린트 체크 + 자동 수정
npm run lint:fix

# 포맷팅 체크
npm run format

# 포맷팅 + 자동 수정
npm run format:fix
```

#### Biome 설정

- **설정 파일**: `biome.json`
- **무시 파일**: `.biomeignore`
- **포맷팅 규칙**: 
  - 들여쓰기: 2칸 공백
  - 줄 길이: 80자
  - 따옴표: 작은따옴표
  - 세미콜론: 항상 사용
  - 후행 쉼표: ES5 스타일

<br/>

## 📝 코딩 컨벤션

### 1. 도메인 중심 폴더 구조 설계

프로젝트는 도메인별로 폴더를 구성하여 관련 기능들을 함께 관리합니다.

### 2. 네이밍 컨벤션

#### TypeScript/JavaScript
```typescript
// 컴포넌트명 (PascalCase)
export const UserProfile = () => { }

// 함수명 (camelCase)
const getUserById = (id: string) => { }

// 변수명 (camelCase)
const userService = new UserService();

// 상수명 (UPPER_SNAKE_CASE)
const JWT_TOKEN_VALIDITY = 3600;

// 타입명 (PascalCase)
interface UserResponse { }

// 파일명 (camelCase)
// userProfile.tsx, userService.ts
```


### 3. 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── globals.css        # 전역 스타일
│   ├── favicon.ico        # 파비콘
│   ├── users/             # ex: 사용자 페이지
│   │   ├── page.tsx       # 사용자 목록
│   │   └── [id]/          # 동적 라우트
│   │       └── page.tsx   # 사용자 상세
│   └── api/               # API 라우트
├── components/            # 재사용 가능한 컴포넌트
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티 함수
├── types/                 # TypeScript 타입 정의
├── stores/                # Zustand 스토어
└── services/              # API 서비스
```

<br/>

## 📝 커밋 컨벤션

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

### 커밋 메시지 형식

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 타입

- **✨ feat**: 새로운 기능 추가
- **🐞 fix**: 버그 수정
- **🐛 design**: CSS 등 사용자 UI 디자인 변경
- **📝 docs**: 문서 수정
- **💄 style**: 코드 포맷 변경(세미콜론, 들여쓰기 등)만 수정
- **🤖 refactor**: 리팩토링, 파일 삭제, 수정, 이동 등
- **✅ test**: 테스트 코드 관련 작업

### 예시

```bash
✨ feat: 사용자 로그인 기능 추가
🐞 fix: API 응답 처리 오류 수정
🐛 design: 버튼 스타일 변경
📝 docs: README 업데이트
💄 style: 코드 포맷팅 적용
🤖 refactor: 컴포넌트 구조 개선
✅ test: 테스트 코드 추가
```

<br/>

## 🌿 브랜치 전략

### 브랜치 종류

- **`main`** - 운영 버전 관리 브랜치
- **`develop`** - 개발 버전 관리 브랜치
- **`feature/*`** - 새 기능 개발하는 브랜치 (예: `feature/user-login`)
- **`fix/*`** - 버그를 수정하기 위한 브랜치 (예: `fix/api-error`)
- **`hotfix/*`** - 긴급 버그를 고치기 위한 브랜치 (예: `hotfix/critical-bug`)

### 브랜치 생성 규칙

```bash
# 기능 개발
git checkout -b feature/user-login

# 버그 수정
git checkout -b fix/api-error

# 긴급 수정
git checkout -b hotfix/critical-bug
```

<br/>

## 🐛 이슈 템플릿

### 기능 요청 이슈

```markdown
[FEAT] - 기능명

## 목적
- 이 기능이 왜 필요한지 설명

## 구현
- 구체적인 구현 방법 설명

## 설명(Optional)
- 추가 설명이 필요한 경우
```

### 버그 리포트 이슈

```markdown
[BUG] - 버그명

## 목적
- 버그 수정 목적

## 구현
- 버그 수정 방법

## 설명(Optional)
- 추가 설명이 필요한 경우
```

### 이슈 라벨

| 라벨 | 설명 |
| --- | --- |
| `Feature` | 새 기능 |
| `Bug` | 버그 수정 |
| `Docs` | 문서 작업 |
| `Test` | 테스트 작업 |
| `Chore` | 설정 관련 작업 |
| `Hotfix` | 긴급 수정 |
| `priority: critical` | 즉시 확인 필요 |
| `priority: high` | 빠른 확인 필요 |
| `priority: medium` | 확인 필요 |
| `priority: low` | 여유 있음 |

<br/>

## 🔄 Pull Request

### PR 생성 전 체크리스트

- [ ] 코드가 프로젝트의 코딩 스타일을 따르는가?
- [ ] 새로운 기능에 대한 테스트가 포함되어 있는가?
- [ ] 문서가 업데이트되었는가?
- [ ] 커밋 메시지가 컨벤션을 따르는가?
- [ ] Biome 린트 검사를 통과했는가? (`npm run lint`)
- [ ] 로컬에서 빌드가 성공하는가? (`npm run build`)

### PR 템플릿

```markdown
## 관련 이슈
- 이슈 번호 또는 링크

## 작업 내용
- 변경된 내용을 간단히 설명

## 리뷰 요구사항(Optional)
- 특별히 리뷰해주길 원하는 부분
```

<br/>

## 🎨 디자인 시스템

이 프로젝트는 MINU 디자인 시스템을 따릅니다.

### 색상 팔레트

- **Gray Scale**: 50-900
- **Blue Scale**: 50-900
- **Red Scale**: 50-900
- **Orange Scale**: 50-900
- **Green Scale**: 50-900
- **Teal Scale**: 50-900
- **Purple Scale**: 50-900

### 타이포그래피

- **Display**: display-1, display-2
- **Title**: title-1 ~ title-4
- **Heading**: heading-1, heading-2, headline-1
- **Body**: body-1, body-1-reading
- **Label**: label-1, label-1-reading
- **Caption**: caption-1, caption-2

### 반응형 브레이크포인트

- **Mobile**: 375px
- **Tablet**: 768px
- **Desktop**: 1024px

<br/>

## 📚 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
