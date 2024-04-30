/*
  Warnings:

  - You are about to drop the `FileAccessMonitor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FileAccessMonitor";

-- CreateTable
CREATE TABLE "FileAccessEvent" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "eventType" "FileAccessEventType" NOT NULL,
    "timestamp" INTEGER NOT NULL,

    CONSTRAINT "FileAccessEvent_pkey" PRIMARY KEY ("id")
);
