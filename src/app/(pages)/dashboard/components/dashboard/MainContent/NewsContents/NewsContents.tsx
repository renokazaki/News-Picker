"use client";

import { selectedDateAtom } from "@/app/store";
import NewsCard from "./NewsCard/NewsCard";
import { useAtomValue } from "jotai";
import { useNews } from "@/app/hooks/useNews";
import { filteringNews } from "./filteringNews";

export default function NewsContents() {
  const { news, isLoading } = useNews();
  const displayNews = news ?? [];
  const selectedDate = useAtomValue(selectedDateAtom);
  const filteredNews = filteringNews(selectedDate, displayNews);

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center py-8">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }
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
}
