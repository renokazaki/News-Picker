import NewsContents from "../NewsContents/NewsContents";
import { NewsItem } from "@/types/News.type";

export default async function News() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const initialNews: NewsItem[] = await fetch(`${apiUrl}/api/n8n`).then((res) =>
    res.json()
  );

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <section className="space-y-4">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <NewsContents initialNews={initialNews} />
        </div>
      </section>
    </main>
  );
}
