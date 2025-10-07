import {
  SidebarInset,
  SidebarProvider,
} from "../../../../../../components/ui/sidebar";
import { AppSidebar } from "../../SideBar/Sidebar";
import Header from "../../Header/Header";
import News from "../NewsContents/News";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user_clerk_id = (await auth()).userId;
  if (!user_clerk_id) {
    redirect("/sign-in");
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
