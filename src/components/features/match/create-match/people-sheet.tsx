'use client';

import dynamic from 'next/dynamic';
import BottomSheet from '@/components/shared/bottom-sheet';

type People = { min: number; max: number };
const PeoplePicker = dynamic(() => import('@/components/ui/people-picker'), {
  ssr: false,
});

type Props = {
  open: boolean;
  onClose: () => void;
  value: People;
  onChange: (v: People) => void;
  onConfirm: () => void;
};

export default function PeopleSheet({
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
      confirmText='선택'
    >
      {open && (
        <PeoplePicker
          onPeopleChange={onChange}
          initialPeople={value.min > 0 ? value : undefined}
        />
      )}
    </BottomSheet>
  );
}
