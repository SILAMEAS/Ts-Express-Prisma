-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "image_path" TEXT,
    "video_path" TEXT,
    "senderId" TEXT NOT NULL,
    "recieverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_id_key" ON "chat"("id");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
