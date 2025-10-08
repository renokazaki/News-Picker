"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { currentNewsAtom } from "@/app/store";

export default function DetailPage() {
  const currentNews = useAtomValue(currentNewsAtom);

  if (!currentNews) {
    return <div>News not found</div>;
  }

  return (
    <div>
      <h1>{currentNews?.title}</h1>
    </div>
  );
}
