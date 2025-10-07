import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interest, user_clerk_id } = body as {
      interest: string;
      user_clerk_id: string;
    };
    if (!user_clerk_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    if (!interest || !user_clerk_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create news record
    const result = await prisma.interest.create({
      data: {
        interest,
        user_clerk_id,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating interest:", error);
    // Prismaエラーの詳細をログ出力
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }

    return NextResponse.json(
      { error: "Failed to create interest" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await prisma.user.findMany({
      include: {
        interests: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
