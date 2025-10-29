'use client';

import GuestLogin from '@/app/(auth)/GuestLogin';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import React from 'react';

export default function AuthAvatar() {
  return (
    <div className="flex h-12 items-center justify-between">
      <div className="flex">
        <SignedOut>
          <div className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text px-4 py-1 text-2xl font-bold text-transparent">
            NewsPicker
          </div>
        </SignedOut>
      </div>

      <div className="mr-4 flex items-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <GuestLogin />
        </SignedOut>
      </div>
    </div>
  );
}
