import { Suspense } from 'react';
import NewsLoading from './components/contents/NewsLoading';
import NewsPane from './components/contents/NewsPane';

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={<NewsLoading />}>
        <NewsPane />
      </Suspense>
    </>
  );
}
