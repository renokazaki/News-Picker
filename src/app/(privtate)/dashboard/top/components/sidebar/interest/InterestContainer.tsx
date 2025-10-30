'use client';

import { cn } from '@/lib/utils';
import { Interest } from '@/types/Interest.type';
import React from 'react';
import { useSelectInterest } from '../../../hooks/useSelectInterest';
import DeleteInterest from './feature/delete/DeleteInterest';
import EditInterest from './feature/update/EditInterest';

type InterestContainerProps = {
  user_clerk_id: string;
  interests: Interest[];
};

export default function InterestContainer({ user_clerk_id, interests }: InterestContainerProps) {
  const { selectedInterest, handleInterestClick } = useSelectInterest();
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
              <DeleteInterest user_clerk_id={user_clerk_id} interestId={interest.id} />
              <EditInterest
                user_clerk_id={user_clerk_id}
                interestId={interest.id}
                interest={interest.interest}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
