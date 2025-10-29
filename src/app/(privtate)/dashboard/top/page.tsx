import { Suspense } from 'react';
import NewsPane from './components/contents/NewsPane';

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsPane />
      </Suspense>
    </>
  );
}
