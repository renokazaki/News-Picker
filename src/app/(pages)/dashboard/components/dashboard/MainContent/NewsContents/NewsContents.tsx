"use client";
import { selectedDateAtom, selectedInterestAtom } from "@/app/store";
import NewsCard from "./NewsCard/NewsCard";
import { useAtomValue } from "jotai";
import { filteringNews } from "./filteringNews";

import { NewsItem } from "@/types/News.type";

export default function NewsContents({ news }: { news: NewsItem[] }) {
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedInterest = useAtomValue(selectedInterestAtom);
  const filteredNews = filteringNews(selectedDate, selectedInterest, news);

  if (filteredNews.length === 0 && (selectedDate || selectedInterest)) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <p className="text-muted-foreground">
          {selectedDate && selectedInterest
            ? `${selectedDate.toLocaleDateString(
                "ja-JP"
              )}の「${selectedInterest}」に関するニュースはありません`
            : selectedDate
            ? `${selectedDate.toLocaleDateString(
                "ja-JP"
              )}のニュースはありません`
            : `「${selectedInterest}」に関するニュースはありません`}
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
