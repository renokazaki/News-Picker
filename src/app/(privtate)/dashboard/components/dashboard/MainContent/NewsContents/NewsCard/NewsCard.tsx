'use client';

import { Card } from '@/components/ui/card';
import { currentNewsAtom } from '@/store';
import { NewsItem } from '@/types/News.type';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import NewsContent from './NewsContent';
import NewsFotter from './NewsFotter';
import NewsTitle from './NewsTitle';

const NewsCard = ({ news, id }: { news: NewsItem; id: number }) => {
  const setCurrentNews = useSetAtom(currentNewsAtom);
  return (
    <Link
      href={`/dashboard/${news.id}`}
      key={id}
      className="block"
      onClick={() => setCurrentNews(news)}
    >
      <Card
        key={id}
        className="group h-full cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:from-gray-900 dark:to-gray-800/50"
      >
        <NewsTitle news={news} />
        <NewsContent news={news} />
        <NewsFotter news={news} />
      </Card>
    </Link>
  );
};

export default NewsCard;
