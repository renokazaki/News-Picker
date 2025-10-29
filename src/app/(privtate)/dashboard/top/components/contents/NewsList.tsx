'use client';

import { NewsItem } from '@/types/News.type';
import { useFilter } from '../../hooks/useFilter';
import NewsCard from './NewsCard';

export default function NewsList({ news }: { news: NewsItem[] }) {
  const { selectedDate, selectedInterest, filteredNews } = useFilter(news);

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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </>
  );
}
