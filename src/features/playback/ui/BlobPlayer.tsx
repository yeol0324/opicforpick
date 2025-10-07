type Props = { blobInfo: { blob: Blob; durationMs: number } };
export const BlobPlayer = (blobInfo: Props) => (
  <audio controls src={URL.createObjectURL(blobInfo.blobInfo.blob)} />
);
