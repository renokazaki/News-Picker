import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/app/components/ui/sidebar';
import { CalendarPicker } from './CalendarPicker';
import Interest from './interest/Interest';

export function AppSidebar({
  user_clerk_id,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user_clerk_id: string }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border flex h-16 items-center justify-center border-b">
        News一覧📰
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0">
            <CalendarPicker />
          </div>
          <SidebarSeparator className="mx-0" />
          <div className="flex-1 overflow-hidden">
            <Interest user_clerk_id={user_clerk_id} />
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
