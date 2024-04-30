/*
  Warnings:

  - You are about to drop the column `RecordedAt` on the `ResourceStats` table. All the data in the column will be lost.
  - Added the required column `Timestamp` to the `ResourceStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResourceStats" DROP COLUMN "RecordedAt",
ADD COLUMN     "Timestamp" INTEGER NOT NULL;
