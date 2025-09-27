import { supabase } from "@shared/api/supabase";

export const getSentences = async () => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};
