export interface NewsItem {
  title: string;
  url: string;
  text: string;
  publishedAt: Date | string;
}

export type DateType = Date | undefined;
