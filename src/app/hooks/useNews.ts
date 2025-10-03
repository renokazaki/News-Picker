import useSWR from "swr";
import { NewsItem } from "@/types/News.type";
import { fetcher } from "@/lib/fetcher";

export function useNews() {
  const { data, error, isLoading, mutate } = useSWR<NewsItem[]>(
    "/api/news",
    fetcher,
    {
      // 2時間キャッシュを保持
      dedupingInterval: 7200000,
      // フォーカス時の再検証を無効化（2時間以内は再取得しない）
      revalidateOnFocus: false,
      // 再接続時の再検証を無効化
      revalidateOnReconnect: false,
      // 定期的な再検証（2時間ごと）
      refreshInterval: 7200000,
    }
  );

  return {
    news: data,
    isLoading,
    isError: error,
    mutate,
  };
}
