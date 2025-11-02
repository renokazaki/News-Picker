import prisma from '@/lib/prisma';
import type { NewsItem } from '@/types/News.type';
import type { Result } from '@/types/result';

/**
 * ユーザーのニュース一覧を取得
 *
 * @param userId - ユーザーのClerk ID
 * @returns ニュース一覧またはエラー
 *
 * @remarks
 * - 公開日の降順でソート
 * - キャッシュ戦略: Data CacheをOFFにし、常に最新データを取得
 *
 * @example
 * ```typescript
 * const result = await fetchUserNews(userId);
 * if (result.isSuccess) {
 *   console.log(result.data); // NewsItem[]
 * }
 * ```
 */
export async function fetchUserNews(userId: string): Promise<Result<NewsItem[]>> {
  try {
    // 入力検証
    if (!userId) {
      return {
        isSuccess: false,
        errorMessage: 'ユーザーIDが指定されていません',
      };
    }

    const news = await prisma.news.findMany({
      where: { user_clerk_id: userId },
      orderBy: { publishedAt: 'desc' },
    });
    return { isSuccess: true, data: news };
  } catch (error) {
    console.error('Error fetching user news:', error);
    return {
      isSuccess: false,
      errorMessage: 'ニュースの取得中にエラーが発生しました',
    };
  }
}
