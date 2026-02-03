import { useId } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  className = '',
  ...props
}: TextFieldProps) {
  const id = useId();

  return (
    <div className="floating-input-group">
      <input
        id={id}
        {...props}
        className={`floating-input ${className}`}
        placeholder=" "
      />
      <label htmlFor={id} className="floating-label">
        {label}
      </label>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
