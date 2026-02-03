import { overlay } from 'overlay-kit';

import { BaseButton } from '@shared/ui';

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

export function openConfirm(options: ConfirmOptions = {}): Promise<boolean> {
  const {
    title = '확인',
    description = '이 작업을 진행할까요?',
    confirmText = '확인',
    cancelText = '취소',
  } = options;

  return overlay.openAsync<boolean>(({ isOpen, close, unmount }) => {
    const handleClose = (result: boolean) => {
      close(result); // Promise resolve(result)
      unmount();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-base font-semibold text-slate-900">
            {title}
          </h2>
          {description && (
            <p className="mb-4 text-sm text-slate-700">{description}</p>
          )}

          <div className="flex justify-end gap-2">
            <BaseButton variant="secondary" onClick={() => handleClose(false)}>
              {cancelText}
            </BaseButton>
            <BaseButton variant="secondary" onClick={() => handleClose(true)}>
              {confirmText}
            </BaseButton>
          </div>
        </div>
      </div>
    );
  });
}
