"use client";

import { selectedDateAtom } from "@/app/store";
import NewsCard from "./NewsCard/NewsCard";
import { NewsItem } from "@/types/News.type";
import { useAtomValue } from "jotai";

const NewsContents = ({ news }: { news: NewsItem[] }) => {
  const selectedDate = useAtomValue(selectedDateAtom);

  const filteredNews = selectedDate
    ? news.filter((item) => {
        const newsDateStr = item.publishedAt.toISOString().split("T")[0];
        const selectedDateStr = `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
        return newsDateStr === selectedDateStr;
      })
    : news;

  if (filteredNews.length === 0 && selectedDate) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <p className="text-muted-foreground">
          {selectedDate.toLocaleDateString("ja-JP")}のニュースはありません
        </p>
      </div>
    );
  }

  return (
    <>
      {filteredNews.map((news, id) => (
        <NewsCard key={id} news={news} id={id} />
      ))}
    </>
  );
};

export default NewsContents;
