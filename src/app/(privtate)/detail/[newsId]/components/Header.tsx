import AuthAvatar from '@/app/(auth)/AuthAvatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DetailHeader() {
  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 border-b border-b-slate-200/30 px-4 shadow-sm backdrop-blur-md dark:border-b-slate-700/30">
      <div className="flex flex-1">
        <Link href="/dashboard/top">
          <Button variant="outline" className="hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ダッシュボードに戻る
          </Button>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <AuthAvatar />
      </div>
    </header>
  );
}
