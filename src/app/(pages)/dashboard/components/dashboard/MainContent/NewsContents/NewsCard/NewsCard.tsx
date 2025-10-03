"use client";
import { Card } from "@/app/components/ui/card";
import NewsFotter from "./NewsFotter";
import NewsContent from "./NewsContent";
import NewsTitle from "./NewsTitle";
import { NewsItem } from "@/types/News.type";

const NewsCard = ({ news, id }: { news: NewsItem; id: number }) => {
  return (
    <Card
      key={id}
      className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
      onClick={() => window.open(news.url, "_blank")}
    >
      <NewsTitle news={news} />
      <NewsContent news={news} />
      <NewsFotter news={news} />
    </Card>
  );
};

export default NewsCard;
