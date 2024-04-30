-- CreateTable
CREATE TABLE "WatchingFile" (
    "id" SERIAL NOT NULL,
    "FileName" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "WatchingFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchingFile" ADD CONSTRAINT "WatchingFile_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
