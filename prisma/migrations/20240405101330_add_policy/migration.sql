/*
  Warnings:

  - You are about to drop the column `body` on the `IssueReport` table. All the data in the column will be lost.
  - Added the required column `action` to the `IssueReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `IssueReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssueReport" DROP COLUMN "body",
ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workspace" JSONB NOT NULL DEFAULT '{}',
    "generatedCode" TEXT NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);
