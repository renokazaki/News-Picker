"use client";
import { Card } from "@/app/components/ui/card";
import NewsFotter from "./NewsFotter";
import NewsContent from "./NewsContent";
import NewsTitle from "./NewsTitle";
import { NewsItem } from "@/types/News.type";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { currentNewsAtom } from "@/app/store";

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
        className="h-full group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
      >
        <NewsTitle news={news} />
        <NewsContent news={news} />
        <NewsFotter news={news} />
      </Card>
    </Link>
  );
};

export default NewsCard;
