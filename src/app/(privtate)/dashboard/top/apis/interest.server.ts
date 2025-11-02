import prisma from '@/lib/prisma';
import type { Interest } from '@/types/Interest.type';
import type { Result } from '@/types/result';

/**
 * ユーザーのInterest一覧を取得
 *
 * @param userId - ユーザーのClerk ID
 * @returns Interest一覧またはエラー
 */
export async function fetchInterests(userId: string): Promise<Result<Interest[]>> {
  try {
    if (!userId) {
      return {
        isSuccess: false,
        errorMessage: 'ユーザーIDが指定されていません',
      };
    }

    const interests = await prisma.interest.findMany({
      where: { user_clerk_id: userId },
    });

    return { isSuccess: true, data: interests };
  } catch (error) {
    console.error('Error fetching interests:', error);
    return {
      isSuccess: false,
      errorMessage: 'キーワードの取得中にエラーが発生しました',
    };
  }
}

/**
 * Interestを新規作成
 *
 * @param userId - ユーザーのClerk ID
 * @param interest - 登録するキーワード
 * @returns 作成されたInterestまたはエラー
 */
export async function createInterest(userId: string, interest: string): Promise<Result<Interest>> {
  try {
    if (!userId) {
      return {
        isSuccess: false,
        errorMessage: 'ユーザーIDが指定されていません',
      };
    }

    if (!interest || interest.trim().length === 0) {
      return {
        isSuccess: false,
        errorMessage: 'キーワードを入力してください',
      };
    }

    const newInterest = await prisma.interest.create({
      data: {
        user_clerk_id: userId,
        interest: interest.trim(),
      },
    });

    return { isSuccess: true, data: newInterest };
  } catch (error) {
    console.error('Error creating interest:', error);
    return {
      isSuccess: false,
      errorMessage: 'キーワードの登録中にエラーが発生しました',
    };
  }
}

/**
 * Interestを更新
 *
 * @param userId - ユーザーのClerk ID
 * @param interestId - 更新するInterestのID
 * @param interest - 新しいキーワード
 * @returns 更新されたInterestまたはエラー
 */
export async function updateInterest(
  userId: string,
  interestId: number,
  interest: string
): Promise<Result<Interest>> {
  try {
    if (!userId) {
      return {
        isSuccess: false,
        errorMessage: 'ユーザーIDが指定されていません',
      };
    }

    if (!interest || interest.trim().length === 0) {
      return {
        isSuccess: false,
        errorMessage: 'キーワードを入力してください',
      };
    }

    const updated = await prisma.interest.update({
      where: {
        user_clerk_id: userId,
        id: interestId,
      },
      data: { interest: interest.trim() },
    });

    return { isSuccess: true, data: updated };
  } catch (error) {
    console.error('Error updating interest:', error);
    return {
      isSuccess: false,
      errorMessage: 'キーワードの更新中にエラーが発生しました',
    };
  }
}

/**
 * Interestを削除
 *
 * @param userId - ユーザーのClerk ID
 * @param interestId - 削除するInterestのID
 * @returns 成功またはエラー
 */
export async function deleteInterest(userId: string, interestId: number): Promise<Result<void>> {
  try {
    if (!userId) {
      return {
        isSuccess: false,
        errorMessage: 'ユーザーIDが指定されていません',
      };
    }

    await prisma.interest.delete({
      where: {
        user_clerk_id: userId,
        id: interestId,
      },
    });

    return { isSuccess: true, data: undefined };
  } catch (error) {
    console.error('Error deleting interest:', error);
    return {
      isSuccess: false,
      errorMessage: 'キーワードの削除中にエラーが発生しました',
    };
  }
}
