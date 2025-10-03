import { CardHeader } from "@/app/components/ui/card";
import { NewsItem } from "@/types/News.type";

interface NewsTitleProps {
  news: NewsItem;
}

const NewsTitle = ({ news }: NewsTitleProps) => {
  return (
    <CardHeader>
      <h3 className="font-semibold text-sm leading-tight line-clamp-3 group-hover:text-primary transition-colors">
        {news.title}
      </h3>
    </CardHeader>
  );
};

export default NewsTitle;
