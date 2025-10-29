'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { selectedInterestAtom } from '@/app/store';
import { cn } from '@/lib/utils';
import { EditInterest } from './EditInterest';
import DeleteInterest from './DeleteInterest';

interface Interest {
  id: number;
  interest: string;
}

interface InterestSelectorProps {
  interests: Interest[];
}

const InterestSelector = ({ interests }: InterestSelectorProps) => {
  const [selectedInterest, setSelectedInterest] = useAtom(selectedInterestAtom);

  const handleInterestClick = (interest: string) => {
    setSelectedInterest(selectedInterest === interest ? undefined : interest);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {interests?.map((interest) => (
          <div
            key={interest.id}
            className={cn(
              'flex w-full cursor-pointer items-center justify-between border border-gray-300 p-2 transition-colors hover:bg-gray-50',
              selectedInterest === interest.interest && 'border-blue-500 bg-blue-100'
            )}
            onClick={() => handleInterestClick(interest.interest)}
          >
            <span
              className={cn(
                'flex-1',
                selectedInterest === interest.interest && 'font-medium text-blue-700'
              )}
            >
              {interest.interest}
            </span>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <DeleteInterest interestId={interest.id} />
              <EditInterest interestId={interest.id} interest={interest.interest} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
