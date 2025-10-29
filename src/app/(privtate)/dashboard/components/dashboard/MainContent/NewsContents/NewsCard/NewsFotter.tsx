import { Badge } from '@/components/ui/badge';
import { CardFooter } from '@/components/ui/card';
import { formatDate } from '@/lib/formatdate';
import { NewsItem } from '@/types/News.type';
import { Clock, ExternalLink } from 'lucide-react';

interface NewsFotterProps {
  news: NewsItem;
}

const NewsFotter = ({ news }: NewsFotterProps) => {
  return (
    <CardFooter className="flex items-center justify-between pt-0">
      <div className="text-muted-foreground flex items-center gap-1 text-xs">
        <Clock className="h-3 w-3" />
        <time
          dateTime={
            typeof news.publishedAt === 'string' ? news.publishedAt : news.publishedAt.toISOString()
          }
        >
          {formatDate(
            typeof news.publishedAt === 'string' ? news.publishedAt : news.publishedAt.toISOString()
          )}
        </time>
      </div>
      <div className="text-muted-foreground flex items-center gap-1 text-xs">
        <Badge className="h-3 w-auto bg-gray-100 text-gray-800">{news.tag}</Badge>
      </div>
      <ExternalLink className="text-muted-foreground group-hover:text-primary h-3 w-3 transition-colors" />
    </CardFooter>
  );
};

export default NewsFotter;
