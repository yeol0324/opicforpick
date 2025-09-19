// import { AddSentenceForm } from "@shared/ui/forms/AddNoteForm";

export function MyNotes() {
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
      {/* <AddSentenceForm onSuccess={() => alert("추가 완료!")} /> */}
    </>
  );
}
