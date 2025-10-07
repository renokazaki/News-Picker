"use client";
import { selectedDateAtom } from "@/app/store";
import NewsCard from "./NewsCard/NewsCard";
import { useAtomValue } from "jotai";
import { filteringNews } from "./filteringNews";

import { NewsItem } from "@/types/News.type";

export default function NewsContents({ news }: { news: NewsItem[] }) {
  const selectedDate = useAtomValue(selectedDateAtom);
  const filteredNews = filteringNews(selectedDate, news);

  if (filteredNews.length === 0 && selectedDate) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <p className="text-muted-foreground">
          {selectedDate.toLocaleDateString("ja-JP")}のニュースはありません
        </p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <p className="text-muted-foreground">ニュースはありません</p>
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
}
