-- CreateTable
CREATE TABLE "CrashLog" (
    "id" SERIAL NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "stackTrace" TEXT NOT NULL,
    "otherInfo" JSONB NOT NULL DEFAULT '{}',
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "CrashLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CrashLog" ADD CONSTRAINT "CrashLog_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
