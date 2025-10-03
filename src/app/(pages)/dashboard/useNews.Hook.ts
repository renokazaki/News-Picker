// "use server";

// import { DateType } from "@/types/News.type";
// import { getNews, getNewsByDate } from "@/actions/news";

// export const fetchNews = async () => {
//   try {
//     const res = await getNews();
//     if (!res) {
//       throw new Error("Failed to fetch news");
//     }
//     return res;
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     throw new Error("Failed to fetch news");
//   }
// };

// export const fetchNewsByDate = async (selectedDate?: DateType) => {
//   try {
//     const res = await getNewsByDate(selectedDate);
//     if (!res) {
//       throw new Error("Failed to fetch news");
//     }
//     return res;
//   } catch (error) {
//     console.error("Error fetching news by date:", error);
//     throw new Error("Failed to fetch news");
//   }
// };

// export const filterNewsByDate = async (selectedDate?: DateType) => {
//   try {
//     const news = await getNews();

//     if (!selectedDate) {
//       return news;
//     }

//     // 選択された日付と同じ日付のニュースをフィルタリング
//     return news.filter((item) => {
//       const newsDateStr = item.publishedAt.toISOString().split("T")[0]; // YYYY-MM-DD部分のみ取得
//       const selectedDateStr = `${selectedDate.getFullYear()}-${String(
//         selectedDate.getMonth() + 1
//       ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

//       return newsDateStr === selectedDateStr;
//     });
//   } catch (error) {
//     console.error("Error filtering news by date:", error);
//     throw new Error("Failed to filter news");
//   }
// };
