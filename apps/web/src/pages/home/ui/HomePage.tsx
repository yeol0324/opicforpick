import { Recorder } from "@shared/ui/recorder";
import { TodayQuestion } from "@entities/today-question";

export function HomePage() {
  return (
    <>
      <TodayQuestion theme="hobby" />
      <Recorder maxSeconds={300} />
    </>
  );
}
