'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { AGE_MAP, GENDER_MAP, LEVEL_NAMES } from '../../constant/create-match';
import type { DraftFilters, Sheet } from '../../types/match/create-match';

export function useMatchFilters() {
  const [activeSheet, setActiveSheet] = useState<Sheet>(null);

  const [draft, setDraft] = useState<DraftFilters>({
    dateTime: { date: '', hour: '', minute: '', year: 0, month: 0, day: 0 },
    people: { min: 2, max: 2 },
    levels: [],
    gender: '',
    ages: [],
    location: '',
  });

  // 실제 적용된 필터(필요시 사용). 현재 화면에선 미사용 가능
  const [filters, setFilters] = useState<DraftFilters>(draft);

  const patchDraft = <K extends keyof DraftFilters>(
    key: K,
    value: DraftFilters[K]
  ) => setDraft((prev) => ({ ...prev, [key]: value }));

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

  return {
    activeSheet,
    setActiveSheet,
    draft,
    setDraft,
    patchDraft,
    filters,
    setFilters,
    derived: { levelText, genderText, ageText, dateText, peopleText },
  } as const;
}
