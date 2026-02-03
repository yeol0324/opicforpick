import { BorderButton } from '@shared/ui';

type ModeToggleButtonProps = {
  mode: 'login' | 'register';
  onToggle: () => void;
};

export const ModeToggleButton = ({ mode, onToggle }: ModeToggleButtonProps) => {
  return (
    <BorderButton variant="primary" onClick={onToggle} className="w-full">
      {mode === 'login' ? '회원가입 하기' : '이미 계정이 있나요? 로그인 하기'}
    </BorderButton>
  );
};
