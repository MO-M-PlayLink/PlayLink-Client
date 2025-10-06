'use client';

import dynamic from 'next/dynamic';
import BottomSheet from '@/components/shared/bottom-sheet';

const LocationPicker = dynamic(
  () => import('@/components/ui/location-picker'),
  { ssr: false }
);

type Props = {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
};

export default function LocationSheet({
  open,
  onClose,
  value,
  onChange,
}: Props) {
  return (
    <BottomSheet
      isOpen={open}
      onClose={onClose}
      height='full'
      showConfirmButton={false}
      showCancelButton={false}
    >
      {open && (
        <LocationPicker
          initialLocation={value}
          onLocationChange={onChange}
          onClose={onClose}
        />
      )}
    </BottomSheet>
  );
}
