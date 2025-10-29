import type { DateType, NewsItem } from '@/types/News.type';
import { atom } from 'jotai';

export const selectedDateAtom = atom<DateType | undefined>(undefined);
export const selectedInterestAtom = atom<string | undefined>(undefined);

export const currentNewsAtom = atom<NewsItem | undefined>(undefined);
