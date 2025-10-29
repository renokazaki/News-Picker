'use server';

import prisma from '@/lib/prisma';

export async function getUserNews(user_clerk_id: string) {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      where: {
        user_clerk_id,
      },
    });

    return { success: true, data: news };
  } catch (error) {
    console.error('Error fetching user news:', error);
    return { success: false, errorMessage: 'Error fetching user news', data: [] };
  }
}
