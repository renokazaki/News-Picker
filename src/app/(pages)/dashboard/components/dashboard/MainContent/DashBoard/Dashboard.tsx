import {
  SidebarInset,
  SidebarProvider,
} from "../../../../../../components/ui/sidebar";
import { AppSidebar } from "../../SideBar/Sidebar";
import Header from "../../Header/Header";
import News from "../NewsContents/News";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <News />
      </SidebarInset>
    </SidebarProvider>
  );
}
