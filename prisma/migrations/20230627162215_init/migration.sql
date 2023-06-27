/*
  Warnings:

  - You are about to drop the column `sender` on the `message` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "chatName" TEXT NOT NULL DEFAULT 'NONAME',
ADD COLUMN     "chatPicture" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "message" DROP COLUMN "sender",
ADD COLUMN     "senderId" TEXT NOT NULL;
