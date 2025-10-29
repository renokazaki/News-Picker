'use client';

import { selectedDateAtom, selectedInterestAtom } from '@/store';
import { NewsItem } from '@/types/News.type';
import { useAtomValue } from 'jotai';
import { filteringNews } from './filteringNews';
import NewsCard from './NewsCard/NewsCard';

export default function NewsContents({ news }: { news: NewsItem[] }) {
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedInterest = useAtomValue(selectedInterestAtom);
  const filteredNews = filteringNews(selectedDate, selectedInterest, news);

  if (filteredNews.length === 0 && (selectedDate || selectedInterest)) {
    return (
      <div className="col-span-full flex items-center justify-center py-8">
        <p className="text-muted-foreground">
          {selectedDate && selectedInterest
            ? `${selectedDate.toLocaleDateString(
                'ja-JP'
              )}の「${selectedInterest}」に関するニュースはありません`
            : selectedDate
              ? `${selectedDate.toLocaleDateString('ja-JP')}のニュースはありません`
              : `「${selectedInterest}」に関するニュースはありません`}
        </p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="col-span-full flex items-center justify-center py-8">
        <p className="text-muted-foreground">ニュースはありません</p>
      </div>
    );
  }

  return (
    <>
      {filteredNews.map((news, id) => (
        <NewsCard key={id} news={news} id={id} />
      ))}
    </>
  );
}
