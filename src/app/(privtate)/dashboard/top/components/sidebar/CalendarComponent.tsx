'use client';

import { Calendar } from '@/components/ui/calendar';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { selectedDateAtom } from '@/store';
import { useAtom } from 'jotai';

export function CalendarComponent() {
  const [date, setDate] = useAtom(selectedDateAtom);
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-blue [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
