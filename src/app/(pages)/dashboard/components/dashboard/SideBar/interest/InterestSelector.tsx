"use client";
import React from "react";
import { useAtom } from "jotai";
import { selectedInterestAtom } from "@/app/store";
import { cn } from "@/lib/utils";
import { EditInterest } from "./EditInterest";
import DeleteInterest from "./DeleteInterest";

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
    <div className="w-full flex flex-col mt-4 space-y-2">
      {interests?.map((interest) => (
        <div
          key={interest.id}
          className={cn(
            "w-full border flex justify-between items-center border-gray-300 p-2 cursor-pointer transition-colors hover:bg-gray-50",
            selectedInterest === interest.interest &&
              "bg-blue-100 border-blue-500"
          )}
          onClick={() => handleInterestClick(interest.interest)}
        >
          <span
            className={cn(
              "flex-1",
              selectedInterest === interest.interest &&
                "text-blue-700 font-medium"
            )}
          >
            {interest.interest}
          </span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <DeleteInterest interestId={interest.id} />
            <EditInterest
              interestId={interest.id}
              interest={interest.interest}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterestSelector;
