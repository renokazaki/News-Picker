/**
 * API呼び出しの結果を表す型
 *
 * @template T - 成功時のデータ型
 *
 * @example
 * ```typescript
 * const result: Result<User> = await fetchUser(userId);
 * if (result.isSuccess) {
 *   console.log(result.data.name); // データは必ず存在
 * } else {
 *   console.error(result.errorMessage); // エラーメッセージ
 * }
 * ```
 */

type SuccessResult<T> = {
  isSuccess: true;
  data: T;
};

type ErrorResult = {
  isSuccess: false;
  errorMessage: string;
};

export type Result<S> = SuccessResult<S> | ErrorResult;
