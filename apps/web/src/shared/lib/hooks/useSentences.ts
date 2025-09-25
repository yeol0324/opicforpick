import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/lib/supabase";
import { unwrap } from "@shared/lib/supabase-helpers";

import type { Sentence } from "@shared/lib/types/supabase";

export function useSentences() {
  return useQuery({
    queryKey: ["sentences"],
    queryFn: async (): Promise<Sentence[]> => {
      const res = await supabase
        .from("sentences")
        .select("*")
        .order("created_at", { ascending: false });
      return unwrap(res);
    },
  });
}
