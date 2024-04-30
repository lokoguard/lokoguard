/*
  Warnings:

  - Added the required column `senderId` to the `FileAccessEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileAccessEvent" ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FileAccessEvent" ADD CONSTRAINT "FileAccessEvent_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
