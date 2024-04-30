/*
  Warnings:

  - You are about to drop the column `scriptRunnerReqeustId` on the `ScriptRunnerResult` table. All the data in the column will be lost.
  - You are about to drop the `ScriptRunnerReqeust` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scriptRunnerRequestId` to the `ScriptRunnerResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScriptRunnerReqeust" DROP CONSTRAINT "ScriptRunnerReqeust_senderId_fkey";

-- DropForeignKey
ALTER TABLE "ScriptRunnerResult" DROP CONSTRAINT "ScriptRunnerResult_scriptRunnerReqeustId_fkey";

-- AlterTable
ALTER TABLE "ScriptRunnerResult" DROP COLUMN "scriptRunnerReqeustId",
ADD COLUMN     "scriptRunnerRequestId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ScriptRunnerReqeust";

-- CreateTable
CREATE TABLE "ScriptRunnerRequest" (
    "id" SERIAL NOT NULL,
    "Script" TEXT NOT NULL,
    "Args" TEXT[],
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "ScriptRunnerRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScriptRunnerRequest" ADD CONSTRAINT "ScriptRunnerRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptRunnerResult" ADD CONSTRAINT "ScriptRunnerResult_scriptRunnerRequestId_fkey" FOREIGN KEY ("scriptRunnerRequestId") REFERENCES "ScriptRunnerRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
