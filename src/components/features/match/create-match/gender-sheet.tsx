'use client';
import dynamic from 'next/dynamic';
import BottomSheet from '@/components/shared/bottom-sheet';

const GenderPicker = dynamic(() => import('@/components/ui/gender-picker'), { ssr: false });

type Props = {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
};

export default function GenderSheet({ open, onClose, value, onChange, onConfirm }: Props) {
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
      {open && <GenderPicker onGenderChange={onChange} initialGender={value} />}
    </BottomSheet>
  );
}