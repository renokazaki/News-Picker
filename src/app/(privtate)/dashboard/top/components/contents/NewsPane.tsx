import { getUserNews } from '@/app/(privtate)/dashboard/top/actions/getUserNews';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NewsList from './NewsList';

export default async function NewsPane() {
  const user_clerk_id = (await auth()).userId;
  if (!user_clerk_id) {
    redirect('/sign-in');
  }
  const res = await getUserNews(user_clerk_id);

  if (!res.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">
          コンテンツ取得中にエラーが発生しました。再読み込みを行ってください。
        </h1>
        <p className="text-sm text-red-500">{res.errorMessage}</p>
      </div>
    );
  }

  const news = res.data;

  return (
    <main className="flex-1 space-y-6 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 lg:p-8 dark:from-slate-900 dark:to-slate-800">
      {news.length === 0 ? (
        <div className="col-span-full flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            ニュースがありません。キーワードを登録しニュースを収集しましょう。
          </p>
        </div>
      ) : (
        <NewsList news={news} />
      )}
    </main>
  );
}
