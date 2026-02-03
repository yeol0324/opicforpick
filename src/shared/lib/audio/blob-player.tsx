import { useEffect } from 'react';

type BlobPlayerProps = {
  blob: Blob;
};

export const BlobPlayer = ({ blob }: BlobPlayerProps) => {
  const src = URL.createObjectURL(blob);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [src]);

  return <audio controls src={src} />;
};
