"use client";

import { useTestGet } from "../../hooks/useTestGet";
import Dashboard from "./components/dashboard/MainContent/DashBoard/Dashboard";

export default function DashboardPage() {
  const { error, isLoading } = useTestGet();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <Dashboard />;
}
