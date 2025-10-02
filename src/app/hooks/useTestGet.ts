import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useTestGet() {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/todos/1`,
    fetcher
  );

  return { data, error, isLoading };
}
