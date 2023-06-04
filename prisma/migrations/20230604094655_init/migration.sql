/*
  Warnings:

  - Added the required column `comments` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shares` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Image', 'video');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "comments" INTEGER NOT NULL,
ADD COLUMN     "like" INTEGER NOT NULL,
ADD COLUMN     "shares" INTEGER NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Image';
