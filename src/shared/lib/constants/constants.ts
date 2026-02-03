/**
 * 애플리케이션 전역 상수
 */

// 페이지네이션
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// 무한 스크롤 설정
export const INFINITE_SCROLL_THRESHOLD = 0.1; // 10% 보일 때
export const INFINITE_SCROLL_ROOT_MARGIN = '100px'; // 100px 전에 미리 로드

// 애니메이션 딜레이
export const SKELETON_MIN_DISPLAY_TIME = 300; // ms
export const TOAST_DURATION = 3000; // ms

// Mock API 설정
export const MOCK_API_DELAY = 800; // ms
export const MOCK_TOTAL_SALONS = 50;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  CART: 'beauty-salon-cart',
  USER_PREFERENCES: 'beauty-salon-preferences',
} as const;

// 라우트
export const ROUTES = {
  HOME: '/',
  SALON_DETAIL: (id: number) => `/salons/${id}`,
  CHECKOUT: '/checkout',
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
} as const;
