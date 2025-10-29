import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard/top">
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              ダッシュボードに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
