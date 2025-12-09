import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getRecording } from "./get-recording";
import type { RecordingFilterType } from "../model/recording.type";
import { buildListKey } from "@shared/lib";

const recordingKeys = {
  all: () => ["recording"] as const,
  list: (filter?: RecordingFilterType) => buildListKey(recordingKeys.all(), filter),
};

export const recordingQueries = {
  list: (filter?: RecordingFilterType) =>
    queryOptions({
      queryKey: recordingKeys.list(filter),
      queryFn: () => getRecording(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
