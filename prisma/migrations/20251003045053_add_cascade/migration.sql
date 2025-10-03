-- DropForeignKey
ALTER TABLE "public"."Interest" DROP CONSTRAINT "Interest_user_clerk_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."News" DROP CONSTRAINT "News_user_clerk_id_fkey";

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("clerk_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("clerk_id") ON DELETE CASCADE ON UPDATE CASCADE;
