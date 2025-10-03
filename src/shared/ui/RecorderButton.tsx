import { useState } from "react";

type Props = {
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  disabled?: boolean;
};

export const RecorderButton = ({ onStart, onStop, disabled }: Props) => {
  const [rec, setRec] = useState(false);
  const toggle = async () => {
    if (rec) {
      await onStop();
      setRec(false);
    } else {
      await onStart();
      setRec(true);
    }
  };
  return (
    <button onClick={toggle} disabled={disabled}>
      {rec ? "Stop" : "Record"}
    </button>
  );
};
