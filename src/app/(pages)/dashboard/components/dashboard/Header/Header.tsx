import BreadcrumbComponents from "./Breadcrumb";
import { Separator } from "../../../../../components/ui/separator";
import { SidebarTrigger } from "../../../../../components/ui/sidebar";

function Header() {
  return (
    <>
      <header className="bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/50 sticky top-0 flex h-16 shrink-0 items-center gap-3 border-b border-b-slate-200/30 dark:border-b-slate-700/30 px-4 z-50 shadow-sm">
        <SidebarTrigger className="-ml-1 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-5 bg-slate-300/50 dark:bg-slate-700/50"
        />
        <BreadcrumbComponents />
      </header>
    </>
  );
}

export default Header;
