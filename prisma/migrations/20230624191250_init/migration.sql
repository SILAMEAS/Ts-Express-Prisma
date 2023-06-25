/*
  Warnings:

  - You are about to drop the column `image_path` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `recieverId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `video_path` on the `chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_userId_fkey";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "image_path",
DROP COLUMN "recieverId",
DROP COLUMN "senderId",
DROP COLUMN "text",
DROP COLUMN "userId",
DROP COLUMN "video_path",
ADD COLUMN     "members" TEXT[];

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "message_id_key" ON "message"("id");
