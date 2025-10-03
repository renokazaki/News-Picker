import Dashboard from "./components/dashboard/MainContent/DashBoard/Dashboard";

export const revalidate = 7200;

export default async function DashboardPage() {
  return <Dashboard />;
}
