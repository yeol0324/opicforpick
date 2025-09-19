import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, error, className = "", ...rest },
  ref
) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-slate-700">{label}</span>}
      <input
        ref={ref}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-400" : "border-slate-300"} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
});
