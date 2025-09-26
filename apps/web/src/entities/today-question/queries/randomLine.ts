// libs/queries/randomLine.ts
import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import { mapRpcRandomLine } from "@widgets/today-question/qa/lib/mapRpc";
import type {
  RandomLine,
  RpcRandomLine,
} from "@widgets/today-question/qa/model/types";

export async function fetchRandomLine(
  theme?: string
): Promise<RandomLine | null> {
  const res = await supabase.rpc("get_random_answer_line", {
    theme_slug: theme ?? null,
  });

  const rows = unwrap<RpcRandomLine[]>(res);
  const row = rows?.[0];
  return row ? mapRpcRandomLine(row) : null;
}
