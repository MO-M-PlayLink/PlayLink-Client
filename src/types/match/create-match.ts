export type Sheet = null | 'dateTime' | 'people' | 'level' | 'gender' | 'age' | 'location';

export type DateTimeDraft = {
  date: string;
  hour: string;
  minute: string;
  year: number;
  month: number;
  day: number;
};

export type DraftFilters = {
  dateTime: DateTimeDraft;
  people: { min: number; max: number };
  levels: string[];
  gender: string;
  ages: string[];
  location: string;
};