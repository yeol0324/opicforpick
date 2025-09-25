import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addSentenceSchema,
  type AddSentenceInput,
} from "@shared/lib/validation/sentence";
import { TextField } from "@shared/ui/fields/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/lib/supabase";
import { unwrap } from "@shared/lib/supabase-helpers";
import type { Sentence } from "@shared/lib/types/supabase";

export function AddSentenceForm({
  onSuccess,
}: {
  onSuccess?: (d: AddSentenceInput) => void;
}) {
  const qc = useQueryClient();
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

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: AddSentenceInput): Promise<Sentence> => {
      const res = await supabase
        .from("sentences")
        .insert(payload)
        .select("*")
        .single();
      return unwrap(res);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sentences"] });
    },
  });

  const onSubmit = async (data: AddSentenceInput) => {
    await mutateAsync(data);
    onSuccess?.(data);
    reset();
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
        {isSubmitting ? "저장 중..." : "추가하기"}
      </button>
    </form>
  );
}
