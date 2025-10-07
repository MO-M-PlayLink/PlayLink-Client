'use client';
import dynamic from 'next/dynamic';
import BottomSheet from '@/components/shared/bottom-sheet';

const AgePicker = dynamic(() => import('@/components/ui/age-picker'), { ssr: false });

type Props = {
  open: boolean;
  onClose: () => void;
  value: string[];
  onChange: (v: string[]) => void;
  onConfirm: () => void;
};

export default function AgeSheet({ open, onClose, value, onChange, onConfirm }: Props) {
  return (
    <BottomSheet
      isOpen={open}
      onClose={onClose}
      height="auto"
      showConfirmButton
      showCancelButton={false}
      confirmText="선택"
      onConfirm={onConfirm}
    >
      {open && <AgePicker onAgeChange={onChange} initialAges={value} />}
    </BottomSheet>
  );
}