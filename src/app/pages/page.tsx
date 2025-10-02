"use client";

import { useTestGet } from "../hooks/useTestGet";

export default function Page({ userId }: { userId: string }) {
  const { data, error, isLoading } = useTestGet();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <div>hello {data.title}!</div>;
}
