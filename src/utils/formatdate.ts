// publishedAt を正規化して ISO と YYYY-MM-DD を返す
export function getPublishedDate(publishedAt: string | Date): { iso: string; ymd: string } {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) {
    return { iso: '', ymd: '' };
  }
  const iso = date.toISOString();
  return { iso, ymd: iso.slice(0, 10) };
}
