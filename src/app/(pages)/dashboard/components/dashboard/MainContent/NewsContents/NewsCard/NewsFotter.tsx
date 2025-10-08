import { CardFooter } from "@/app/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";
import { NewsItem } from "@/types/News.type";
import { formatDate } from "@/lib/formatdate";
import { Badge } from "@/app/components/ui/badge";

interface NewsFotterProps {
  news: NewsItem;
}

const NewsFotter = ({ news }: NewsFotterProps) => {
  return (
    <CardFooter className="pt-0 flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <time
          dateTime={
            typeof news.publishedAt === "string"
              ? news.publishedAt
              : news.publishedAt.toISOString()
          }
        >
          {formatDate(
            typeof news.publishedAt === "string"
              ? news.publishedAt
              : news.publishedAt.toISOString()
          )}
        </time>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Badge className="h-3 w-auto bg-gray-100 text-gray-800">
          {news.tag}
        </Badge>
      </div>
      <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
    </CardFooter>
  );
};

export default NewsFotter;
