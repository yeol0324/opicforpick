import { useSentences } from "@shared/lib/hooks/useSentences";
import { AddSentenceForm } from "@shared/ui/forms/AddNoteForm";

export function MyNotes() {
  const { data, isLoading, error } = useSentences();
  if (isLoading) return <p>불러오는 중…...</p>;
  if (error) return <p className="text-red-600">에러 발생</p>;

  return (
    <>
      <h1>나의 기록</h1>
      <button>등록</button>
      <button>정렬</button>
      등록 빠른 순서, 등록 느린 순서, 중요도순, 가나다순
      <ul>
        <li>
          My room is very large, so I can keep many things in it.
          <button>수정</button>
          <button>삭제</button>
        </li>
      </ul>
      <div className="p-6 space-y-2">
        <h1 className="text-xl font-semibold">문장 목록</h1>
        {isLoading && (
          <div className="text-sm text-slate-500">불러오는 중…</div>
        )}
        <ul className="list-disc pl-6">
          {data?.map((s) => (
            <li key={s.id}>{s.text}</li>
          ))}
        </ul>
        <div className="mx-auto max-w-md p-6">
          <h1 className="mb-4 text-2xl font-bold">새 문장 추가</h1>
          <AddSentenceForm onSuccess={() => alert("추가 완료!")} />
        </div>
      </div>
    </>
  );
}
