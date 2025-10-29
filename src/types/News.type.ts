export type NewsItem = {
  id: number;
  title: string;
  url: string;
  text: string;
  tag: string;
  publishedAt: Date | string;
};

export type DateType = Date | undefined;
