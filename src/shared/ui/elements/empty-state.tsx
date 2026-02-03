type EmptyStateProps = {
  message?: string;
  className?: string;
};

export function EmptyState({
  message = '데이터가 없습니다',
  className = 'p-4 text-center text-slate-500',
}: EmptyStateProps) {
  return <div className={className}>{message}</div>;
}
