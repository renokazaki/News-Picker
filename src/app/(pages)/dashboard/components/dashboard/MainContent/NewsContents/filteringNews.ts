import { DateType, NewsItem } from "@/types/News.type";

export const filteringNews = (
  selectedDate: DateType,
  displayNews: NewsItem[]
) => {
  return selectedDate
    ? displayNews.filter((item) => {
        // Handle both Date objects and string dates
        const newsDate =
          typeof item.publishedAt === "string"
            ? new Date(item.publishedAt)
            : item.publishedAt;
        const newsDateStr = newsDate.toISOString().split("T")[0];
        const selectedDateStr = `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
        return newsDateStr === selectedDateStr;
      })
    : displayNews;
};
