import type { ButtonHTMLAttributes } from 'react';

type BorderButtonVariant = 'primary' | 'secondary';

export type BorderButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BorderButtonVariant;
};

export function BorderButton({
  variant = 'secondary',
  className = '',
  children,
  ...props
}: BorderButtonProps) {
  const variantStyles: Record<BorderButtonVariant, string> = {
    primary: 'border-1 border-brand text-brand bg-transparent',
    secondary: 'border-1 border-brand-lighter text-black bg-transparent',
  };

  return (
    <button {...props} className={`btn ${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  );
}
