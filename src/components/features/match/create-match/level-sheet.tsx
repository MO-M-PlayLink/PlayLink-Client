'use client';

import dynamic from 'next/dynamic';
import BottomSheet from '@/components/shared/bottom-sheet';

const LevelPicker = dynamic(() => import('@/components/ui/level-picker'), {
  ssr: false,
});

type Props = {
  open: boolean;
  onClose: () => void;
  value: string[];
  onChange: (v: string[]) => void;
  onConfirm: () => void;
};

export default function LevelSheet({
  open,
  onClose,
  value,
  onChange,
  onConfirm,
}: Props) {
  return (
    <BottomSheet
      isOpen={open}
      onClose={onClose}
      height='auto'
      showConfirmButton
      showCancelButton={false}
      confirmText='선택'
      onConfirm={onConfirm}
    >
      {open && <LevelPicker onLevelChange={onChange} initialLevels={value} />}
    </BottomSheet>
  );
}
