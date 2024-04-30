/*
  Warnings:

  - Added the required column `EventType` to the `FileIntegrityMonitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FileName` to the `FileIntegrityMonitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Timestamp` to the `FileIntegrityMonitor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('create', 'access', 'delete', 'write');

-- CreateEnum
CREATE TYPE "ScriptRunnerStatus" AS ENUM ('pending', 'done');

-- AlterTable
ALTER TABLE "FileIntegrityMonitor" ADD COLUMN     "EventType" "EventType" NOT NULL,
ADD COLUMN     "FileName" TEXT NOT NULL,
ADD COLUMN     "Timestamp" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ScriptRunnerReqeust" (
    "id" SERIAL NOT NULL,
    "Script" TEXT NOT NULL,
    "Args" TEXT[],
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "ScriptRunnerReqeust_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScriptRunnerResult" (
    "id" SERIAL NOT NULL,
    "Output" TEXT NOT NULL,
    "Error" TEXT NOT NULL,
    "Success" BOOLEAN NOT NULL,
    "ExitCode" INTEGER NOT NULL,
    "scriptRunnerReqeustId" INTEGER NOT NULL,

    CONSTRAINT "ScriptRunnerResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScriptRunnerReqeust" ADD CONSTRAINT "ScriptRunnerReqeust_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptRunnerResult" ADD CONSTRAINT "ScriptRunnerResult_scriptRunnerReqeustId_fkey" FOREIGN KEY ("scriptRunnerReqeustId") REFERENCES "ScriptRunnerReqeust"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
