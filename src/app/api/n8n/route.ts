import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user_clerk_id = "testuser";
    const { text, title, url, publishedAt } = body as {
      text: string;
      title: string;
      url: string;
      publishedAt: string;
      user_clerk_id: string;
    };

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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
