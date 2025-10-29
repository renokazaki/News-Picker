import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '../../../../../../../components/ui/sidebar';
import Header from '../../Header/Header';
import { AppSidebar } from '../../SideBar/Sidebar';
import News from '../NewsContents/News';

export default async function Dashboard() {
  const user_clerk_id = (await auth()).userId;
  if (!user_clerk_id) {
    redirect('/sign-in');
  }
  return (
    <SidebarProvider>
      <AppSidebar user_clerk_id={user_clerk_id} />
      <SidebarInset>
        <Header />
        <News user_clerk_id={user_clerk_id} />
      </SidebarInset>
    </SidebarProvider>
  );
}
