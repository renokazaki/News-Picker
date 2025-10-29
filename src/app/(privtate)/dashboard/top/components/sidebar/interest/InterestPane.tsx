import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import CreateInterest from './feature/create/CreateInterest';
import InterestList from './InterestList';

export default async function InterestPane() {
  const user_clerk_id = (await auth()).userId;
  if (!user_clerk_id) {
    redirect('/sign-in');
  }
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-shrink-0">
        <CreateInterest user_clerk_id={user_clerk_id} />
      </div>
      <div className="flex-1 overflow-hidden">
        <InterestList user_clerk_id={user_clerk_id} />
      </div>
    </div>
  );
}
