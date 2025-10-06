'use client';

import BottomSheet from '@/components/shared/bottom-sheet';
import {
  BubbleChat,
  Calendar,
  LocationLarge,
  Sort,
  UserLove,
  UserMulti,
} from '@/components/shared/icons';
import AgePicker from '@/components/ui/age-picker';
import Button from '@/components/ui/button';
import DateTimePicker from '@/components/ui/date-time-picker';
import GenderPicker from '@/components/ui/gender-picker';
import LevelPicker from '@/components/ui/level-picker';
import LocationPicker from '@/components/ui/location-picker';
import PeoplePicker from '@/components/ui/people-picker';
import SelectButton from '@/components/ui/select-button';
import { PATHS } from '@/constant';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const CreateMatchPage = () => {
  const router = useRouter();
  type Sheet =
    | null
    | 'dateTime'
    | 'people'
    | 'level'
    | 'gender'
    | 'age'
    | 'location';

  type DraftFilters = {
    dateTime: {
      date: string;
      hour: string;
      minute: string;
      year: number;
      month: number;
      day: number;
    };
    people: { min: number; max: number };
    levels: string[];
    gender: string;
    ages: string[];
    location: string;
  };

  const [activeSheet, setActiveSheet] = useState<Sheet>(null);

  const [draft, setDraft] = useState<DraftFilters>({
    dateTime: { date: '', hour: '', minute: '', year: 0, month: 0, day: 0 },
    people: { min: 2, max: 2 },
    levels: [],
    gender: '',
    ages: [],
    location: '',
  });

  const [filters, setFilters] = useState<DraftFilters>(draft);

  // 부분 업데이트 헬퍼
  const patchDraft = <K extends keyof DraftFilters>(
    key: K,
    value: DraftFilters[K]
  ) => setDraft((prev) => ({ ...prev, [key]: value }));

  // 레벨명 매핑
  const LEVEL_NAMES = ['입문', '초보', '중급', '고급', '매니아'] as const;
  const GENDER_MAP: Record<string, string> = {
    male: '남성',
    female: '여성',
    all: '제한없음',
  };
  const AGE_MAP: Record<string, string> = {
    '20s': '20대',
    '30s': '30대',
    '40s': '40대',
    '50s': '50대 이상',
  };

  const joinLabels = (labels: string[]) =>
    labels.map((l, i) => (i ? ` | ${l}` : l)).join('');

  const levelText = useMemo(() => {
    if (draft.levels.length === 0) return '상관없음';
    const labels = draft.levels
      .map((id) => id.match(/lv(\d+)/))
      .map((m) => (m ? LEVEL_NAMES[parseInt(m[1]) - 1] : ''))
      .filter(Boolean);
    return joinLabels(labels);
  }, [draft.levels]);

  const genderText = useMemo(
    () =>
      draft.gender ? (GENDER_MAP[draft.gender] ?? '상관없음') : '상관없음',
    [draft.gender]
  );

  const ageText = useMemo(() => {
    if (draft.ages.length === 0) return '상관없음';
    if (draft.ages.length === 4) return '제한없음';
    return joinLabels(
      draft.ages.map((id) => AGE_MAP[id] ?? '').filter(Boolean)
    );
  }, [draft.ages]);

  const dateText = useMemo(() => {
    const { year, month, day, hour, minute } = draft.dateTime;
    if (!year) return '';
    const dateObj = new Date(
      year,
      (month || 1) - 1,
      day || 1,
      parseInt(hour || '0'),
      parseInt(minute || '0')
    );
    return format(dateObj, 'yyyy년 MM월 dd일 HH:mm');
  }, [draft.dateTime]);

  const peopleText = useMemo(
    () => `최소 ${draft.people.min}명 | 최대 ${draft.people.max}명`,
    [draft.people]
  );

  return (
    <div className='flex flex-col gap-s-16 pt-s-24'>
      <SelectButton
        icon={<Calendar size={24} className='text-icon-neutral' />}
        placeholder='날짜와 시간을 선택해 주세요.'
        value={dateText}
        onClick={() => setActiveSheet('dateTime')}
      />

      <SelectButton
        icon={<UserMulti size={24} className='text-icon-neutral' />}
        placeholder='최소 2명 | 최대 n명'
        value={peopleText}
        onClick={() => setActiveSheet('people')}
      />

      <SelectButton
        icon={<Sort size={24} className='text-icon-neutral' />}
        placeholder='운동레벨'
        subText={levelText}
        defaultSubText='상관없음'
        onClick={() => setActiveSheet('level')}
      />

      <SelectButton
        icon={<UserLove size={24} className='text-icon-neutral' />}
        placeholder='성별'
        subText={genderText}
        defaultSubText='상관없음'
        onClick={() => setActiveSheet('gender')}
      />

      <SelectButton
        icon={<BubbleChat size={24} className='text-icon-neutral' />}
        placeholder='연령대'
        subText={ageText}
        defaultSubText='상관없음'
        onClick={() => setActiveSheet('age')}
      />

      <SelectButton
        icon={<LocationLarge size={24} className='text-icon-neutral' />}
        placeholder='장소를 선택해주세요'
        value={draft.location}
        onClick={() => setActiveSheet('location')}
      />

      {/* 날짜/시간 */}
      <BottomSheet
        isOpen={activeSheet === 'dateTime'}
        onClose={() => setActiveSheet(null)}
        height='auto'
        showConfirmButton
        showCancelButton={false}
        confirmText='선택'
        onConfirm={() => {
          setFilters(draft);
          setActiveSheet(null);
        }}
      >
        <DateTimePicker
          onDateTimeChange={(v) => patchDraft('dateTime', v)}
          initialDateTime={draft.dateTime.year ? draft.dateTime : undefined}
        />
      </BottomSheet>

      {/* 인원 */}
      <BottomSheet
        isOpen={activeSheet === 'people'}
        onClose={() => setActiveSheet(null)}
        height='auto'
        showConfirmButton
        showCancelButton={false}
        confirmText='선택'
        onConfirm={() => {
          setFilters(draft);
          setActiveSheet(null);
        }}
      >
        <PeoplePicker
          onPeopleChange={(v) => patchDraft('people', v)}
          initialPeople={draft.people.min > 0 ? draft.people : undefined}
        />
      </BottomSheet>

      {/* 운동 레벨 선택 BottomSheet */}
      <BottomSheet
        isOpen={activeSheet === 'level'}
        onClose={() => setActiveSheet(null)}
        height='auto'
        showConfirmButton
        showCancelButton={false}
        confirmText='선택'
        onConfirm={() => {
          setActiveSheet(null);
        }}
      >
        <LevelPicker
          key={activeSheet === 'level' ? 'open' : 'closed'}
          onLevelChange={(levels) => patchDraft('levels', levels)}
          initialLevels={draft.levels}
        />
      </BottomSheet>

      {/* 성별 선택 BottomSheet */}
      <BottomSheet
        isOpen={activeSheet === 'gender'}
        onClose={() => setActiveSheet(null)}
        height='auto'
        showConfirmButton
        showCancelButton={false}
        confirmText='선택'
        onConfirm={() => {
          setActiveSheet(null);
        }}
      >
        <GenderPicker
          key={activeSheet === 'gender' ? 'open' : 'closed'}
          onGenderChange={(gender) => patchDraft('gender', gender)}
          initialGender={draft.gender}
        />
      </BottomSheet>

      {/* 연령대 선택 BottomSheet */}
      <BottomSheet
        isOpen={activeSheet === 'age'}
        onClose={() => setActiveSheet(null)}
        height='auto'
        showConfirmButton
        showCancelButton={false}
        confirmText='선택'
        onConfirm={() => {
          setActiveSheet(null);
        }}
      >
        <AgePicker
          key={activeSheet === 'age' ? 'open' : 'closed'}
          onAgeChange={(ages) => patchDraft('ages', ages)}
          initialAges={draft.ages}
        />
      </BottomSheet>

      {/* 장소 */}
      <BottomSheet
        isOpen={activeSheet === 'location'}
        onClose={() => setActiveSheet(null)}
        height='full'
        showConfirmButton={false}
        showCancelButton={false}
      >
        <LocationPicker
          onLocationChange={(v) => patchDraft('location', v)}
          initialLocation={draft.location}
          onClose={() => setActiveSheet(null)}
        />
      </BottomSheet>
      {!activeSheet && (
        <Button
          isFloat
          onClick={() => router.push(`${PATHS.MATCH.CREATE_MATCH}/description`)}
        >
          다음
        </Button>
      )}
    </div>
  );
};

export default CreateMatchPage;
