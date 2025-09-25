// libs/queries/randomLine.ts
import { supabase } from "@shared/lib/supabase";
import { unwrap } from "@shared/lib/supabase-helpers";
import { mapRpcRandomLine } from "@entities/qa/lib/mapRpc";
import type { RandomLine, RpcRandomLine } from "@entities/qa/model/types";

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
