'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { selectedDateAtom, selectedInterestAtom } from '@/store';
import { useAtom, useAtomValue } from 'jotai';
import { X } from 'lucide-react';

export default function BreadcrumbComponents() {
  const date = useAtomValue(selectedDateAtom);
  const selectedInterest = useAtomValue(selectedInterestAtom);
  const [, setDate] = useAtom(selectedDateAtom);
  const [, setSelectedInterest] = useAtom(selectedInterestAtom);

  const getBreadcrumbText = () => {
    if (date && selectedInterest) {
      return `${date.toLocaleDateString('ja-JP')} - ${selectedInterest}`;
    } else if (date) {
      return date.toLocaleDateString('ja-JP');
    } else if (selectedInterest) {
      return selectedInterest;
    } else {
      return 'All News';
    }
  };

  const handleClearFilters = () => {
    setDate(undefined);
    setSelectedInterest(undefined);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <div className="flex items-center gap-2">
            <BreadcrumbPage className="text-sm font-medium">{getBreadcrumbText()}</BreadcrumbPage>
            {(date || selectedInterest) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
