import { useEffect, useMemo } from "react";

type BlobPlayerProps = {
  blob: Blob;
};

export const BlobPlayer = ({ blob }: BlobPlayerProps) => {
  const src = useMemo(() => URL.createObjectURL(blob), [blob]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [src]);

  return <audio controls src={src} />;
};
