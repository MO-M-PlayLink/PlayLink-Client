export const LEVEL_NAMES = ['입문', '초보', '중급', '고급', '매니아'] as const;

export const GENDER_MAP: Record<string, string> = {
  male: '남성',
  female: '여성',
  all: '제한없음',
};

export const AGE_MAP: Record<string, string> = {
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  '50s': '50대 이상',
};
