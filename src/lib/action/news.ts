"use server";
import prisma from "@/lib/prisma";

export const getNews = async () => {
  const news = await prisma.news.findMany();
  return news;
};
