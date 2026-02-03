type ErrorMessageProps = {
  message?: string | null;
  className?: string;
};

export function ErrorMessage({
  message = '에러가 발생했습니다',
  className = 'text-red-600',
}: ErrorMessageProps) {
  return <p className={className}>{message}</p>;
}
