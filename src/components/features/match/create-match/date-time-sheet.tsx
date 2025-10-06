'use client';

import dynamic from 'next/dynamic';
import BottomSheet from '@/components/shared/bottom-sheet';
import type { DateTimeDraft } from '../../../../types/match/create-match';

const DateTimePicker = dynamic(
  () => import('@/components/ui/date-time-picker'),
  { ssr: false }
);

type Props = {
  open: boolean;
  onClose: () => void;
  value: DateTimeDraft;
  onChange: (v: DateTimeDraft) => void;
  onConfirm: () => void;
};

export default function DateTimeSheet({
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
      {open && (
        <DateTimePicker
          onDateTimeChange={onChange}
          initialDateTime={value.year ? value : undefined}
        />
      )}
    </BottomSheet>
  );
}
