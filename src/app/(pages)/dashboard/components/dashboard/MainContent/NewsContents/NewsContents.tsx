"use client";

import { selectedDateAtom } from "@/app/store";
import NewsCard from "./NewsCard/NewsCard";
import { NewsItem } from "@/types/News.type";
import { useAtomValue } from "jotai";
import { useNews } from "@/app/hooks/useNews";
import { filteringNews } from "./filteringNews";

type NewsContentsProps = {
  initialNews: NewsItem[];
};

const NewsContents = ({ initialNews }: NewsContentsProps) => {
  // ✅ SWRで最新データを取得
  const { news, isLoading, isError } = useNews();
  // ✅ 新しいデータがあれば使用、なければ初期データ
  const displayNews = news ?? initialNews;
  const selectedDate = useAtomValue(selectedDateAtom);
  const filteredNews = filteringNews(selectedDate, displayNews);

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
