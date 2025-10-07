import React from "react";
import { getInterest } from "./getInterest";

const InterestList = async ({ user_clerk_id }: { user_clerk_id: string }) => {
  const interests = await getInterest(user_clerk_id);

  return (
    <div className="w-full flex flex-col mt-4 space-y-2">
      {interests?.map((interest) => (
        <div key={interest.id} className="w-full border border-gray-300 p-2">
          {interest.interest}
        </div>
      ))}
    </div>
  );
};

export default InterestList;
