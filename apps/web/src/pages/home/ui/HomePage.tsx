import { Recorder } from "@shared/ui/recorder";

export function HomePage() {
  return (
    <>
      <h1>오늘의 질문</h1> <h2>"당신의 취미는 무엇인가요?"</h2>
      <Recorder maxSeconds={300} />
    </>
  );
}
