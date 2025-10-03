import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addSentenceSchema,
  type AddSentenceInput,
} from "@shared/lib/validation/note";
import { TextField } from "@shared/ui/fields/TextField";

type Props = {
  onSuccess?: (data: AddSentenceInput) => void;
};

export function AddSentenceForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<AddSentenceInput>({
    resolver: yupResolver(addSentenceSchema),
    mode: "onChange",
    defaultValues: { text: "", note: "", source: "" },
  });
  console.log(onSuccess, reset);

  const onSubmit = async (data: AddSentenceInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <TextField
        label="문장"
        error={errors.text?.message}
        {...register("text")}
      />
      <TextField
        label="메모(선택)"
        error={errors.note?.message}
        {...register("note")}
      />
      <TextField
        label="출처(선택)"
        error={errors.source?.message}
        {...register("source")}
      />

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "저장중" : "추가하기"}
      </button>
    </form>
  );
}
