import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/app/components/ui/sidebar";
import { CalendarPicker } from "./CalendarPicker";
import Interest from "./interest/Interest";
export function AppSidebar({
  user_clerk_id,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user_clerk_id: string }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className=" border-sidebar-border h-16 border-b flex justify-center items-center">
        News一覧📰
      </SidebarHeader>
      <SidebarContent>
        <CalendarPicker />
        <SidebarSeparator className="mx-0" />
        <Interest user_clerk_id={user_clerk_id} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
