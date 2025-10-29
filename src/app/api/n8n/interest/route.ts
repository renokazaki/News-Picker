import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interest, user_clerk_id } = body as {
      interest: string;
      user_clerk_id: string;
    };
    if (!user_clerk_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate required fields
    if (!interest || !user_clerk_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
    console.error('Error creating interest:', error);
    // Prismaエラーの詳細をログ出力
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    return NextResponse.json({ error: 'Failed to create interest' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const user_clerk_id = request.nextUrl.searchParams.get('user_clerk_id');
  if (!user_clerk_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const interests = await prisma.interest.findMany({
      where: {
        user_clerk_id: user_clerk_id,
      },
    });
    return NextResponse.json(interests, { status: 200 });
  } catch (error) {
    console.error('Error fetching interests:', error);
    return NextResponse.json({ error: 'Failed to fetch interests' }, { status: 500 });
  }
}
