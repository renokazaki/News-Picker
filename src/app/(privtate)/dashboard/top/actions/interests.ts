'use server';

import type { Interest } from '@/types/Interest.type';
import type { Result } from '@/types/result';
import { revalidatePath } from 'next/cache';
import { createInterest, deleteInterest, updateInterest } from '../apis/interest.server';

/**
 * Interestを登録するServer Action
 *
 * @remarks
 * - APIクライアント経由でDB操作
 * - 成功時にキャッシュを再検証
 * - フォームバリデーションはクライアント側で実施済み
 *
 * @param userId - ユーザーのClerk ID
 * @param interest - 登録するキーワード
 * @returns 作成されたInterestまたはエラー
 */
export async function postInterestAction(
  userId: string,
  interest: string
): Promise<Result<Interest>> {
  // ユーザー認証チェック
  if (!userId) {
    return {
      isSuccess: false,
      errorMessage: 'ログインしてください',
    };
  }

  // APIクライアント経由でDB操作
  const result = await createInterest(userId, interest);

  // 成功時のみキャッシュを再検証
  if (result.isSuccess) {
    revalidatePath('/dashboard/top');
  }

  return result;
}

/**
 * Interestを更新するServer Action
 *
 * @param userId - ユーザーのClerk ID
 * @param interestId - 更新するInterestのID
 * @param interest - 新しいキーワード
 * @returns 更新されたInterestまたはエラー
 */
export async function updateInterestAction(
  userId: string,
  interestId: number,
  interest: string
): Promise<Result<Interest>> {
  if (!userId) {
    return {
      isSuccess: false,
      errorMessage: 'ログインしてください',
    };
  }

  const result = await updateInterest(userId, interestId, interest);

  if (result.isSuccess) {
    revalidatePath('/dashboard/top');
  }

  return result;
}

/**
 * Interestを削除するServer Action
 *
 * @param userId - ユーザーのClerk ID
 * @param interestId - 削除するInterestのID
 * @returns 成功またはエラー
 */
export async function deleteInterestAction(
  userId: string,
  interestId: number
): Promise<Result<void>> {
  if (!userId) {
    return {
      isSuccess: false,
      errorMessage: 'ログインしてください',
    };
  }

  const result = await deleteInterest(userId, interestId);

  if (result.isSuccess) {
    revalidatePath('/dashboard/top');
  }

  return result;
}
