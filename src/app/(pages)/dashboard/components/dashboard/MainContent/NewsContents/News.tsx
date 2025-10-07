import NewsContents from "../NewsContents/NewsContents";

export default async function News() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <section className="space-y-4">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <NewsContents />
        </div>
      </section>
    </main>
  );
}
