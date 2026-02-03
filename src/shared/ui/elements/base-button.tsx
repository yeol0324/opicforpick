import type { ButtonHTMLAttributes } from 'react';

type BaseButtonVariant = 'primary' | 'secondary';

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BaseButtonVariant;
};

export function BaseButton({
  variant = 'secondary',
  className = '',
  children,
  ...props
}: BaseButtonProps) {
  const variantStyles: Record<BaseButtonVariant, string> = {
    primary: 'bg-brand text-white',
    secondary: 'bg-brand-lighter text-black',
  };

  return (
    <button {...props} className={`btn ${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  );
}
