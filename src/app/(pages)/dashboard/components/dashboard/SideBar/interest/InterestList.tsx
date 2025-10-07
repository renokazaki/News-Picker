import React from "react";
import { getInterest } from "./handleInterest";
import { EditInterest } from "./EditInterest";
import DeleteInterest from "./DeleteInterest";

const InterestList = async ({ user_clerk_id }: { user_clerk_id: string }) => {
  const interests = await getInterest(user_clerk_id);

  return (
    <div className="w-full flex flex-col mt-4 space-y-2">
      {interests?.map((interest) => (
        <div
          key={interest.id}
          className="w-full border flex justify-between items-center border-gray-300 p-2"
        >
          {interest.interest}
          <div className="flex gap-2">
            <DeleteInterest interestId={interest.id} />
            <EditInterest interestId={interest.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterestList;
