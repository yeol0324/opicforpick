import { useQuery } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';

import {
  recordingQueries,
  type SpeechRecordingWithRelations,
} from '@entities/recording';

import { YYYYMMDDHHmm } from '@shared/lib';
import { Card } from '@shared/ui';

import { RecordingDetailOverlay } from './recording-detail.overlay';

export function MyRecords() {
  const recordingQuery = useQuery({
    ...recordingQueries.list(),
  });
  const feedbackItems = recordingQuery.data?.items ?? [];
  const handleOpen = (item: SpeechRecordingWithRelations) => {
    overlay.open(({ close, unmount }) => (
      <RecordingDetailOverlay
        params={item}
        onClose={() => {
          close();
          unmount();
        }}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <section className="w-full space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">나의 기록 💡</h2>

        <Card>
          {feedbackItems && (
            <ul>
              {feedbackItems.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={[
                      'cursor-pointer rounded-md p-2 transition-colors',
                      'hover:bg-slate-100',
                    ].join(' ')}
                    onClick={() => handleOpen(item)}
                  >
                    <p className="truncate">{item.sentences?.sentence_eng}</p>
                    <p>{YYYYMMDDHHmm(item.created_at)}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}
