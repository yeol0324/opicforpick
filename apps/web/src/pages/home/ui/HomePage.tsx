import { Recorder } from "@shared/ui/recorder";
import { TodayQuestion } from "@widgets/today-question";

export function HomePage() {
  return (
    <>
      <TodayQuestion theme="hobby" />
      <Recorder maxSeconds={300} />
    </>
  );
}
