'use client';

import { useRouter } from 'next/navigation';
import SelectButton from '@/components/ui/select-button';
import Button from '@/components/ui/button';
import { PATHS } from '@/constant';
import {
  BubbleChat,
  Calendar,
  LocationLarge,
  Sort,
  UserLove,
  UserMulti,
} from '@/components/shared/icons';
import { useMatchFilters } from '../../hooks/match/create-match';
import DateTimeSheet from '../features/match/create-match/date-time-sheet';
import PeopleSheet from '../features/match/create-match/people-sheet';
import LevelSheet from '../features/match/create-match/level-sheet';
import GenderSheet from '../features/match/create-match/gender-sheet';
import AgeSheet from '../features/match/create-match/age-sheet';
import LocationSheet from '../features/match/create-match/location-sheet';

export default function CreateMatchForm() {
  const router = useRouter();
  const {
    activeSheet,
    setActiveSheet,
    draft,
    patchDraft,
    setFilters,
    derived: { dateText, peopleText, levelText, genderText, ageText },
  } = useMatchFilters();

  return (
    <>
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

      {/* Sheets */}
      <DateTimeSheet
        open={activeSheet === 'dateTime'}
        onClose={() => setActiveSheet(null)}
        value={draft.dateTime}
        onChange={(v) => patchDraft('dateTime', v)}
        onConfirm={() => {
          setFilters((prev) => ({ ...prev, dateTime: draft.dateTime }));
          setActiveSheet(null);
        }}
      />

      <PeopleSheet
        open={activeSheet === 'people'}
        onClose={() => setActiveSheet(null)}
        value={draft.people}
        onChange={(v) => patchDraft('people', v)}
        onConfirm={() => {
          setFilters((prev) => ({ ...prev, people: draft.people }));
          setActiveSheet(null);
        }}
      />

      <LevelSheet
        open={activeSheet === 'level'}
        onClose={() => setActiveSheet(null)}
        value={draft.levels}
        onChange={(v) => patchDraft('levels', v)}
        onConfirm={() => setActiveSheet(null)}
      />

      <GenderSheet
        open={activeSheet === 'gender'}
        onClose={() => setActiveSheet(null)}
        value={draft.gender}
        onChange={(v) => patchDraft('gender', v)}
        onConfirm={() => setActiveSheet(null)}
      />

      <AgeSheet
        open={activeSheet === 'age'}
        onClose={() => setActiveSheet(null)}
        value={draft.ages}
        onChange={(v) => patchDraft('ages', v)}
        onConfirm={() => setActiveSheet(null)}
      />

      <LocationSheet
        open={activeSheet === 'location'}
        onClose={() => setActiveSheet(null)}
        value={draft.location}
        onChange={(v) => patchDraft('location', v)}
      />

      {!activeSheet && (
        <Button
          isFloat
          onClick={() => router.push(`${PATHS.MATCH.CREATE_MATCH}/description`)}
        >
          다음
        </Button>
      )}
    </>
  );
}
