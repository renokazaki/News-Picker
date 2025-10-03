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

  // 🔧 修正1: req.json()ではなくreq.text()を使用
  const payload = await req.text();
  let evt: WebhookEvent;

  try {
    // 🔧 修正2: JSON.stringify()を削除（payloadはすでに文字列）
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
      // 🔧 修正3: usernameがnullの場合の処理を追加
      const displayName =
        evt.data.username ||
        evt.data.first_name ||
        evt.data.email_addresses?.[0]?.email_address?.split("@")[0] ||
        "User";

      const profileImage = evt.data.image_url || "";

      console.log("Creating user with:", {
        clerk_id: evt.data.id,
        display_name: displayName,
        profile_image: profileImage,
      });

      // ユーザーを作成
      // 🔧 修正4: created_atとupdated_atを削除（Prismaが自動設定）
      await prisma.user.create({
        data: {
          clerk_id: evt.data.id,
          display_name: displayName,
          profile_image: profileImage,
        },
      });

      return new Response("User created successfully", { status: 201 });
    } catch (err) {
      console.error("Error inserting user into database:", err);
      // 🔧 修正5: エラー詳細を追加
      if (err instanceof Error) {
        console.error("Error details:", err.message);
      }
      return new Response("Error: Database operation failed", { status: 500 });
    }
  }

  if (evt.type === "user.updated") {
    try {
      const displayName =
        evt.data.username ||
        evt.data.first_name ||
        evt.data.email_addresses?.[0]?.email_address?.split("@")[0] ||
        "User";

      const profileImage = evt.data.image_url || "";

      await prisma.user.update({
        where: { clerk_id: evt.data.id },
        data: {
          display_name: displayName,
          profile_image: profileImage,
          // updated_atは@updatedAtで自動更新される
        },
      });

      return new Response("User updated successfully", { status: 200 });
    } catch (err) {
      console.error("Error updating user:", err);
      if (err instanceof Error) {
        console.error("Error details:", err.message);
      }
      return new Response("Error: Database operation failed", { status: 500 });
    }
  }

  if (evt.type === "user.deleted") {
    try {
      // ユーザーを削除
      await prisma.user.delete({
        where: {
          clerk_id: evt.data.id,
        },
      });

      return new Response("User deleted successfully", { status: 200 });
    } catch (err) {
      console.error("Error deleting user:", err);
      if (err instanceof Error) {
        console.error("Error details:", err.message);
      }
      return new Response("Error: Database operation failed", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
