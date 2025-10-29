import AuthAvatar from '@/app/(auth)/AuthAvatar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import BreadcrumbComponents from './Breadcrumb';

export default function Header() {
  return (
    <>
      <header className="bg-background/80 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 border-b border-b-slate-200/30 px-4 shadow-sm backdrop-blur-md dark:border-b-slate-700/30">
        <SidebarTrigger className="-ml-1 transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/50" />
        <Separator
          orientation="vertical"
          className="mr-2 bg-slate-300/50 data-[orientation=vertical]:h-5 dark:bg-slate-700/50"
        />
        <BreadcrumbComponents />
        <div className="flex flex-1 justify-end">
          <AuthAvatar />
        </div>
      </header>
    </>
  );
}
