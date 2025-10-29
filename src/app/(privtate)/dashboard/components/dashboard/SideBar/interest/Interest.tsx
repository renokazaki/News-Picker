import React from 'react';
import InterestList from './InterestList';
import { InterestModal } from './InterestModal';

const Interest = ({ user_clerk_id }: { user_clerk_id: string }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-shrink-0">
        <InterestModal user_clerk_id={user_clerk_id} />
      </div>
      <div className="flex-1 overflow-hidden">
        <InterestList user_clerk_id={user_clerk_id} />
      </div>
    </div>
  );
};

export default Interest;
