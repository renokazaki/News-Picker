import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import * as React from 'react';
import { Suspense } from 'react';
import { CalendarComponent } from './CalendarComponent';
import InterestLoading from './interest/InterestLoading';
import InterestPane from './interest/InterestPane';

export default function SidebarPane({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border flex h-16 items-center justify-center border-b">
        News一覧📰
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0">
            <CalendarComponent />
          </div>
          <SidebarSeparator className="mx-0" />
          <div className="flex-1 overflow-hidden">
            <Suspense fallback={<InterestLoading />}>
              <InterestPane />
            </Suspense>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
