/*
  Warnings:

  - You are about to drop the column `image_path` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture_path` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `comments` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "image_path",
DROP COLUMN "profile_picture_path",
DROP COLUMN "username",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
