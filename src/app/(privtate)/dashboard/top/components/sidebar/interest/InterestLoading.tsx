import { Skeleton } from '@/components/ui/skeleton';

export default function InterestLoading() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-shrink-0">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
