'use client';

import { Calendar } from '@/app/components/ui/calendar';
import { SidebarGroup, SidebarGroupContent } from '@/app/components/ui/sidebar';
import { selectedDateAtom } from '@/app/store';
import { useAtom } from 'jotai';

export function CalendarPicker() {
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
