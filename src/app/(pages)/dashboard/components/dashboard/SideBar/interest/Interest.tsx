import React from "react";
import InterestList from "./InterestList";
import { InterestModal } from "./InterestModal";

const Interest = ({ user_clerk_id }: { user_clerk_id: string }) => {
  return (
    <div className="w-full">
      <InterestModal user_clerk_id={user_clerk_id} />
      <InterestList user_clerk_id={user_clerk_id} />
    </div>
  );
};

export default Interest;
