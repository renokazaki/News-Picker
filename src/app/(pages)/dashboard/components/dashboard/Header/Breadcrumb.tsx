"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/app/components/ui/breadcrumb";
import { selectedDateAtom } from "@/app/store";
import { useAtomValue } from "jotai";
const BreadcrumbComponents = () => {
  const date = useAtomValue(selectedDateAtom);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-sm font-medium">
            {date ? date.toLocaleDateString() : "All Day's News"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponents;
