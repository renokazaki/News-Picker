"use server";
import prisma from "@/lib/prisma";
import { FormSchemaType } from "@/lib/schema";
import { revalidatePath } from "next/cache";

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

export async function deleteInterest(interestId: number) {
  try {
    const interest = await prisma.interest.delete({
      where: { id: interestId },
    });
    revalidatePath("/dashboard");
    return interest;
  } catch (error) {
    console.error("Error deleting interest:", error);
    return null;
  }
}

export async function updateInterest(interestId: number, data: FormSchemaType) {
  try {
    const interest = await prisma.interest.update({
      where: { id: interestId },
      data: { interest: data.interest },
    });
    revalidatePath("/dashboard");
    return interest;
  } catch (error) {
    console.error("Error updating interest:", error);
    return null;
  }
}

export async function postInterest(
  data: FormSchemaType,
  user_clerk_id: string
) {
  try {
    const interest = await prisma.interest.create({
      data: {
        interest: data.interest,
        user_clerk_id,
      },
    });
    revalidatePath("/dashboard");
    return interest;
  } catch (error) {
    console.error("Error submitting form:", error);
    return null;
  }
}
