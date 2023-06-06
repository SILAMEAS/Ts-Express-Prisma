/*
  Warnings:

  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - The `comments` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `like` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shares` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_path` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "type",
ADD COLUMN     "image_path" TEXT NOT NULL,
ADD COLUMN     "profile_picture_path" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "comments",
ADD COLUMN     "comments" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "like",
ADD COLUMN     "like" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "shares",
ADD COLUMN     "shares" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "RefreshToken";

-- DropEnum
DROP TYPE "Type";
