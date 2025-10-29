import React from 'react';
import { getInterest } from './handleInterest';
import InterestSelector from './InterestSelector';

const InterestList = async ({ user_clerk_id }: { user_clerk_id: string }) => {
  const interests = await getInterest(user_clerk_id);

  return <InterestSelector interests={interests || []} />;
};

export default InterestList;
