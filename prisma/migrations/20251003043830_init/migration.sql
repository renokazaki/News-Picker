-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "user_clerk_id" TEXT NOT NULL,
    "interest" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "user_clerk_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_id_key" ON "User"("clerk_id");

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
