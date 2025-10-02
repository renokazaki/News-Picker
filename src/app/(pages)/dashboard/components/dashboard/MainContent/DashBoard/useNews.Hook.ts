import { use } from "react";
import { NewsItem, DateType } from "@/types/News.type";

const fetchNews = async (): Promise<NewsItem[]> => {
  const res = await fetch(`${process.env.VITE_API_URL}/n8n/news`);
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }
  return res.json();
};

const newsPromise = fetchNews();

export const useNews = (selectedDate?: DateType) => {
  const data = use(newsPromise);

  if (!selectedDate) {
    return data;
  }

  // 選択された日付と同じ日付のニュースをフィルタリング
  return data.filter((news) => {
    const newsDateStr = news.publishedAt.split("T")[0]; // YYYY-MM-DD部分のみ取得
    const selectedDateStr = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    return newsDateStr === selectedDateStr;
  });
};
