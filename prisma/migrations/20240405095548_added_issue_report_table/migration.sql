-- CreateTable
CREATE TABLE "IssueReport" (
    "id" SERIAL NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "IssueReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IssueReport" ADD CONSTRAINT "IssueReport_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
