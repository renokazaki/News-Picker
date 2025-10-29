import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsLoading() {
  return (
    <main className="flex-1 space-y-6 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 lg:p-8 dark:from-slate-900 dark:to-slate-800">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card
            key={index}
            className="group h-full cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md transition-all duration-200 dark:from-gray-900 dark:to-gray-800/50"
          >
            <CardHeader>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-0">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-3 w-3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
