import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getRecording } from "./get-recording";
import type { RecordingFilter } from "../model/types";
import { buildListKey } from "@shared/lib";

const recordingKeys = {
  all: () => ["recording"] as const,
  list: (filter?: RecordingFilter) => buildListKey(recordingKeys.all(), filter),
};

export const recordingQueries = {
  list: (filter?: RecordingFilter) =>
    queryOptions({
      queryKey: recordingKeys.list(filter),
      queryFn: () => getRecording(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
