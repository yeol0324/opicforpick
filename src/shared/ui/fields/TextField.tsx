import { useId } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  className = "",
  ...props
}: TextFieldProps) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900
          outline-none ring-0 transition
          placeholder:text-slate-400
          focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${className}`}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
