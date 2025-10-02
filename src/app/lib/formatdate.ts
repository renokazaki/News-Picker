// Date型の日付を「YYYY-MM-DD」形式に変換する関数
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const limit = new Date(date);
  if (date > limit) return "";
  return date.toISOString().slice(0, 10);
}
