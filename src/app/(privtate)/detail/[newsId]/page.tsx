import { Suspense } from 'react';
import DetailLoading from './components/DetailLoading';
import DetailPane from './components/DetailPane';

export default function DetailPage() {
  return (
    <Suspense fallback={<DetailLoading />}>
      <DetailPane />
    </Suspense>
  );
}
