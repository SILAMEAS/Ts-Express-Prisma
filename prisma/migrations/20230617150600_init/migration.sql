-- AlterTable
ALTER TABLE "User" ADD COLUMN     "groupChannel" TEXT NOT NULL DEFAULT 'Unknow',
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userChannel" TEXT NOT NULL DEFAULT 'Unknow';
