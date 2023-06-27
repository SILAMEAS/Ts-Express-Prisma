/*
  Warnings:

  - The `chatName` column on the `chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `chatPicture` column on the `chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "chatName",
ADD COLUMN     "chatName" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "chatPicture",
ADD COLUMN     "chatPicture" TEXT[] DEFAULT ARRAY[]::TEXT[];
