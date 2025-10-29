import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from './components/header/Header';
import SidebarPane from './components/sidebar/SidebarPane';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarPane />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
