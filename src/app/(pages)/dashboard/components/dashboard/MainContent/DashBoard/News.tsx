import { Suspense } from "react";
import NewsContents from "./NewsContents/NewsContents";

const News = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Loading...</p>
        </div>
      }
    >
      <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <section className="space-y-4">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <NewsContents />
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default News;
