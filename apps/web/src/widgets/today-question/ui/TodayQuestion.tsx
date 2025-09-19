import { useEffect, useState } from "react";
import { supabase } from "@shared/api/supabase";
import type { RandomLine } from "@entities/qa/model/types";
import { mapRpcRandomLine } from "@entities/qa/lib/mapRpc";
import { Spinner } from "@shared/ui/spinner";

type Props = { theme?: string };

export function TodayQuestion({ theme }: Props) {
  const [loading, setLoading] = useState(true);
  const [line, setLine] = useState<RandomLine | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);

      const res = await supabase.rpc("get_random_answer_line", {
        theme_slug: theme ?? null,
      });

      if (res.error) {
        if (!mounted) return;
        setError(res.error.message);
        setLine(null);
        setLoading(false);
        return;
      }

      const row = res.data?.[0];
      if (!mounted) return;
      setLine(row ? mapRpcRandomLine(row) : null);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [theme]);

  if (loading) return <Spinner />;
  if (error) return <div>오류: {error}</div>;
  if (!line) return <div>문장을 찾지 못했어요.</div>;

  return (
    <section>
      <h3>오늘의 질문</h3>
      <p>
        {line.qKo} <em>({line.qEn})</em>
      </p>
      <h4>예시 답변</h4>
      <p>
        {line.ko} <em>({line.en})</em>
      </p>
    </section>
  );
}
