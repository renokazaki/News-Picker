import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, title, url, publishedAt } = body as {
      text: string;
      title: string;
      url: string;
      publishedAt: string;
    };
    const user_clerk_id = "user_33XmzUBKDjtz9qAeSwM8WjvsIUp";
    if (!user_clerk_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    if (!text || !title || !url || !publishedAt || !user_clerk_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create news record
    const news = await prisma.news.create({
      data: {
        text,
        title,
        url,
        publishedAt: new Date(publishedAt),
        user_clerk_id,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    // Prismaエラーの詳細をログ出力
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }

    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const user_clerk_id = (await auth()).userId;
  if (!user_clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
