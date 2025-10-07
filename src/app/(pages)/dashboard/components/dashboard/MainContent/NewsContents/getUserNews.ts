"use server";

import prisma from "@/lib/prisma";

export async function getUserNews(user_clerk_id: string) {
  if (!user_clerk_id) {
    return [];
  }

  try {
    const news = await prisma.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      where: {
        user_clerk_id,
      },
    });

    return news;
  } catch (error) {
    console.error("Error fetching user news:", error);
    return [];
  }
}
