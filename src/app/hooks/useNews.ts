import { NewsItem } from "@/types/News.type";
import { fetcher } from "@/lib/fetcher";
import { Interest } from "@prisma/client";
import useSWR from "swr";

// export function useNews() {
//   const apiUrl =
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
//   const { data, error, isLoading } = useSWR<NewsItem[]>(
//     `${apiUrl}/api/n8n`,
//     fetcher,
//     {
//       // 4時間キャッシュを保持
//       dedupingInterval: 14400000,
//       // フォーカス時の再検証を無効化（4時間以内は再取得しない）
//       revalidateOnFocus: false,
//       // 再接続時の再検証を無効化
//       revalidateOnReconnect: false,
//       // 定期的な再検証（4時間ごと）
//       refreshInterval: 14400000,
//     }
//   );

//   return {
//     news: data,
//     isLoading,
//     isError: error,
//   };
// }

export function useInterests(user_clerk_id: string) {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const { data, error, isLoading } = useSWR<Interest[]>(
    `${apiUrl}/api/n8n/interests?user_clerk_id=${user_clerk_id}`,
    fetcher
  );

  return {
    interests: data,
    isLoading,
    isError: error,
  };
}
