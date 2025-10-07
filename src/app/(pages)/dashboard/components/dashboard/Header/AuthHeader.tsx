import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import GuestLogin from "@/app/(pages)/(auth)/GuestLogin";
const AuthHeader = () => {
  return (
    <div className="flex justify-between items-center h-12">
      <div className="flex">
        <SignedOut>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent px-4 py-1">
            NewsPicker
          </div>
        </SignedOut>
      </div>

      <div className="flex items-center gap-4 mr-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <GuestLogin />
        </SignedOut>
      </div>
    </div>
  );
};

export default AuthHeader;
