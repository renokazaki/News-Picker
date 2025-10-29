import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

export function useTestGet() {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/todos/1`,
    fetcher
  );

  return { data, error, isLoading };
}
