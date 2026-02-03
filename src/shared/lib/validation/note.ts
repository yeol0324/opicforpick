import * as yup from 'yup';

export const addSentenceSchema = yup.object({
  text: yup
    .string()
    .trim()
    .min(1, '문장을 입력해 주세요.')
    .max(500, '최대 500자까지 가능합니다.')
    .required(),
  note: yup
    .string()
    .trim()
    .max(200, '메모는 200자 이하로 입력해 주세요.')
    .optional()
    .default(''),
  source: yup
    .string()
    .trim()
    .max(100, '출처는 100자 이하로 입력해 주세요.')
    .optional()
    .default(''),
});

export type AddSentenceInput = yup.InferType<typeof addSentenceSchema>;
