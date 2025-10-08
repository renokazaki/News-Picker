"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/app/components/ui/breadcrumb";
import { selectedDateAtom, selectedInterestAtom } from "@/app/store";
import { useAtomValue } from "jotai";

const BreadcrumbComponents = () => {
  const date = useAtomValue(selectedDateAtom);
  const selectedInterest = useAtomValue(selectedInterestAtom);

  const getBreadcrumbText = () => {
    if (date && selectedInterest) {
      return `${date.toLocaleDateString("ja-JP")} - ${selectedInterest}`;
    } else if (date) {
      return date.toLocaleDateString("ja-JP");
    } else if (selectedInterest) {
      return selectedInterest;
    } else {
      return "All News";
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-sm font-medium">
            {getBreadcrumbText()}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponents;
