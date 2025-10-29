import NewsContents from '../NewsContents/NewsContents';
import { getUserNews } from './getUserNews';

export default async function News({ user_clerk_id }: { user_clerk_id: string }) {
  const news = await getUserNews(user_clerk_id);

  return (
    <main className="flex-1 space-y-6 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 lg:p-8 dark:from-slate-900 dark:to-slate-800">
      <section className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <NewsContents news={news} />
        </div>
      </section>
    </main>
  );
}
