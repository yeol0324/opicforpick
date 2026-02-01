/**
 * 포맷팅 유틸리티 함수들
 */

/**
 * 숫자를 한국 원화 형식으로 포맷
 * @example formatPrice(35000) // "35,000원"
 */
export function formatPrice(price: number): string {
    return `${price.toLocaleString('ko-KR')}원`;
  }
  
  /**
   * 분 단위 시간을 포맷
   * @example formatDuration(90) // "90분"
   */
  export function formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}분`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}시간 ${remainingMinutes}분`
      : `${hours}시간`;
  }
  
  /**
   * 평점을 소수점 첫째자리까지 포맷
   * @example formatRating(4.567) // "4.6"
   */
  export function formatRating(rating: number): string {
    return rating.toFixed(1);
  }
  
  /**
   * 전화번호를 포맷
   * @example formatPhoneNumber("01012345678") // "010-1234-5678"
   */
  export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  }
  
  /**
   * 숫자에 천 단위 구분자 추가
   * @example formatNumber(1234567) // "1,234,567"
   */
  export function formatNumber(num: number): string {
    return num.toLocaleString('ko-KR');
  }