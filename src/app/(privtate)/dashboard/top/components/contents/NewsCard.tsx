'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { currentNewsAtom } from '@/store';
import { NewsItem } from '@/types/News.type';
import { getPublishedDate } from '@/utils/formatdate';
import { useSetAtom } from 'jotai';
import { Clock } from 'lucide-react';
import Link from 'next/link';

const NewsCard = ({ news }: { news: NewsItem }) => {
  const setCurrentNews = useSetAtom(currentNewsAtom);
  return (
    <Link href={`/detail/${news.id}`} className="block" onClick={() => setCurrentNews(news)}>
      <Card
        key={news.id}
        className="group h-full cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:from-gray-900 dark:to-gray-800/50"
      >
        <CardHeader>
          <h3 className="group-hover:text-primary line-clamp-3 text-sm leading-tight font-semibold transition-colors">
            {news.title}
          </h3>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <p className="text-muted-foreground line-clamp-10 text-sm">{news.text}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-0">
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {(() => {
              const { iso, ymd } = getPublishedDate(news.publishedAt);
              return <time dateTime={iso}>{ymd}</time>;
            })()}
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <Badge className="h-3 w-auto bg-gray-100 text-gray-800">{news.tag}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NewsCard;
