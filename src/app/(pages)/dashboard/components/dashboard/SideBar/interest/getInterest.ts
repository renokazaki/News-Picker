"use server";

import prisma from "@/lib/prisma";

export async function getInterest(user_clerk_id: string) {
  if (!user_clerk_id) {
    return [];
  }

  try {
    const interests = await prisma.interest.findMany({
      where: {
        user_clerk_id,
      },
    });
    return interests;
  } catch (error) {
    console.error("Error fetching interests:", error);
    return [];
  }
}
