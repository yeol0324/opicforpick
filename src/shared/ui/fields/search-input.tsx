import { forwardRef } from 'react';

import { Style } from '@shared/lib';

type SearchInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = '검색어', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className="background rounded-lg border-2 border-[--brand] px-3 py-2 focus:border-sky-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ['--brand' as string]: Style.BRAND }}
        {...props}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
