'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FormSchemaType } from '../schemas/schema';

export async function getInterest(user_clerk_id: string) {
  try {
    const interests = await prisma.interest.findMany({
      where: {
        user_clerk_id,
      },
    });
    return { success: true, data: interests };
  } catch (error) {
    console.error('Error fetching interests:', error);
    return { success: false, errorMessage: 'Error fetching interests', data: [] };
  }
}

export async function deleteInterest(interestId: number) {
  try {
    await prisma.interest.delete({
      where: { id: interestId },
    });
    revalidatePath('/dashboard/top');
    return { success: true };
  } catch (error) {
    console.error('Error deleting interest:', error);
    return { success: false, errorMessage: 'Error deleting interest' };
  }
}

export async function updateInterest(interestId: number, data: FormSchemaType) {
  try {
    await prisma.interest.update({
      where: { id: interestId },
      data: { interest: data.interest },
    });
    revalidatePath('/dashboard/top');
    return { success: true };
  } catch (error) {
    console.error('Error updating interest:', error);
    return { success: false, errorMessage: 'Error updating interest' };
  }
}

export async function postInterest(data: FormSchemaType, user_clerk_id: string) {
  try {
    await prisma.interest.create({
      data: {
        interest: data.interest,
        user_clerk_id,
      },
    });
    revalidatePath('/dashboard/top');
    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, errorMessage: 'Error submitting form' };
  }
}
