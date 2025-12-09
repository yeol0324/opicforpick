import { forwardRef } from "react";

import type { SentenceType } from "@entities/sentence";

import { THEME } from "@shared/lib";


type SentenceTypeSelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
> & {
  value: SentenceType | undefined;
  onChange: (value: SentenceType | undefined) => void;
};

const SENTENCE_TYPE_OPTIONS = [
  { value: "", label: "전체 타입" },
  { value: "0", label: "question" },
  { value: "1", label: "answer" },
  { value: "2", label: "generic" },
] as const;

export const SentenceTypeSelect = forwardRef<
  HTMLSelectElement,
  SentenceTypeSelectProps
>(({ value, onChange, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className="border-2 border-[--brand] px-3 py-2 rounded-lg focus:border-sky-500"
      value={value ?? ""}
      onChange={(e) => {
        const selectedValue = e.target.value;
        onChange(
          selectedValue === ""
            ? undefined
            : (Number(selectedValue) as SentenceType)
        );
      }}
      style={{ ["--brand" as string]: THEME.BRAND }}
      {...props}
    >
      {SENTENCE_TYPE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

SentenceTypeSelect.displayName = "SentenceTypeSelect";
