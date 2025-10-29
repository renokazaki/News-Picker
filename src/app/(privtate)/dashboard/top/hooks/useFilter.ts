import { filteringNews } from '@/app/(privtate)/dashboard/top/utils/filteringNews';
import { selectedDateAtom, selectedInterestAtom } from '@/store';
import { NewsItem } from '@/types/News.type';
import { useAtomValue } from 'jotai';

export const useFilter = (news: NewsItem[]) => {
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedInterest = useAtomValue(selectedInterestAtom);
  const filteredNews = filteringNews(selectedDate, selectedInterest, news);

  return { selectedDate, selectedInterest, filteredNews };
};
