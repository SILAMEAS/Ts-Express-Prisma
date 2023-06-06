/*
  Warnings:

  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "userId";
