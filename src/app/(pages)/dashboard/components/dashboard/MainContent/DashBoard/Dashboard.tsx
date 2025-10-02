import {
  SidebarInset,
  SidebarProvider,
} from "../../../../components/ui/sidebar";
import News from "./News";
import { AppSidebar } from "../../SideBar/Sidebar";
import Header from "../Header/Header";

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
