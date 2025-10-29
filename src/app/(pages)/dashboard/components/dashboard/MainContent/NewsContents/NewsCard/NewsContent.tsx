import { CardContent } from '@/app/components/ui/card';
import { NewsItem } from '@/types/News.type';

interface NewsContentProps {
  news: NewsItem;
}

const NewsContent = ({ news }: NewsContentProps) => {
  return (
    <CardContent className="pt-0 pb-4">
      <p className="text-muted-foreground line-clamp-10 text-sm">{news.text}</p>
    </CardContent>
  );
};

export default NewsContent;
