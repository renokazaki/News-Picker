import { CardHeader } from '@/app/components/ui/card';
import { NewsItem } from '@/types/News.type';

interface NewsTitleProps {
  news: NewsItem;
}

const NewsTitle = ({ news }: NewsTitleProps) => {
  return (
    <CardHeader>
      <h3 className="group-hover:text-primary line-clamp-3 text-sm leading-tight font-semibold transition-colors">
        {news.title}
      </h3>
    </CardHeader>
  );
};

export default NewsTitle;
