/*
  Warnings:

  - Made the column `profile_picture_path` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_picture_path" SET NOT NULL,
ALTER COLUMN "profile_picture_path" SET DEFAULT '';
