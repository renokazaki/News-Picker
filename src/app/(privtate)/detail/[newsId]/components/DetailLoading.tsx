import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DetailLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>

          <Skeleton className="h-8 w-3/4" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
          </div>

          <div className="flex justify-between border-t border-slate-200 pt-6 dark:border-slate-700">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
