import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.text();
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", (err as Error).message);
    return new Response("Error: Verification error", { status: 400 });
  }

  if (evt.type === "user.created") {
    try {
      await prisma.user.create({
        data: {
          clerk_id: evt.data.id,
          display_name: evt.data.username || evt.data.first_name || "User",
          profile_image: evt.data.image_url || "",
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      return new Response("User created successfully", { status: 201 });
    } catch (err) {
      console.error("Error inserting user into database:", err);
      return new Response("Error: Database operation failed", { status: 500 });
    }
  }

  if (evt.type === "user.updated") {
    try {
      await prisma.user.update({
        where: { clerk_id: evt.data.id },
        data: {
          display_name: evt.data.username || evt.data.first_name || "User",
          profile_image: evt.data.image_url || "",
          updated_at: new Date(),
        },
      });

      return new Response("User updated successfully", { status: 200 });
    } catch (err) {
      console.error("Error updating user:", err);
      return new Response("Error: Database operation failed", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
