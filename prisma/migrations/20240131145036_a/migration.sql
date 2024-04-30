/*
  Warnings:

  - You are about to drop the column `CPUStats` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `DiskStats` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `HostInfo` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `MemStat` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `NetStat` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `TemperatureStats` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `Timestamp` on the `ResourceStats` table. All the data in the column will be lost.
  - You are about to drop the column `Args` on the `ScriptRunnerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `Script` on the `ScriptRunnerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `ScriptRunnerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `Error` on the `ScriptRunnerResult` table. All the data in the column will be lost.
  - You are about to drop the column `ExitCode` on the `ScriptRunnerResult` table. All the data in the column will be lost.
  - You are about to drop the column `Output` on the `ScriptRunnerResult` table. All the data in the column will be lost.
  - You are about to drop the column `Success` on the `ScriptRunnerResult` table. All the data in the column will be lost.
  - You are about to drop the `FileIntegrityMonitor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchingFile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[scriptRunnerRequestId]` on the table `ScriptRunnerResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timestamp` to the `ResourceStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `script` to the `ScriptRunnerRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `error` to the `ScriptRunnerResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitCode` to the `ScriptRunnerResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output` to the `ScriptRunnerResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `ScriptRunnerResult` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileAccessEventType" AS ENUM ('create', 'access', 'delete', 'write');

-- DropForeignKey
ALTER TABLE "WatchingFile" DROP CONSTRAINT "WatchingFile_senderId_fkey";

-- AlterTable
ALTER TABLE "ResourceStats" DROP COLUMN "CPUStats",
DROP COLUMN "DiskStats",
DROP COLUMN "HostInfo",
DROP COLUMN "MemStat",
DROP COLUMN "NetStat",
DROP COLUMN "TemperatureStats",
DROP COLUMN "Timestamp",
ADD COLUMN     "cpuStats" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "diskStats" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "hostInfo" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "memStat" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "netStat" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "temperatureStats" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "timestamp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ScriptRunnerRequest" DROP COLUMN "Args",
DROP COLUMN "Script",
DROP COLUMN "Status",
ADD COLUMN     "args" TEXT[],
ADD COLUMN     "script" TEXT NOT NULL,
ADD COLUMN     "status" "ScriptRunnerStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "ScriptRunnerResult" DROP COLUMN "Error",
DROP COLUMN "ExitCode",
DROP COLUMN "Output",
DROP COLUMN "Success",
ADD COLUMN     "error" TEXT NOT NULL,
ADD COLUMN     "exitCode" INTEGER NOT NULL,
ADD COLUMN     "output" TEXT NOT NULL,
ADD COLUMN     "success" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "FileIntegrityMonitor";

-- DropTable
DROP TABLE "WatchingFile";

-- DropEnum
DROP TYPE "EventType";

-- CreateTable
CREATE TABLE "FileWatcher" (
    "id" SERIAL NOT NULL,
    "FileName" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "FileWatcher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileAccessMonitor" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "eventType" "FileAccessEventType" NOT NULL,
    "timestamp" INTEGER NOT NULL,

    CONSTRAINT "FileAccessMonitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogMessage" (
    "id" SERIAL NOT NULL,
    "version" INTEGER NOT NULL,
    "facilityMessage" TEXT NOT NULL,
    "facilityLevel" TEXT NOT NULL,
    "severityMessage" TEXT NOT NULL,
    "severityLevel" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "appname" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "LogMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScriptRunnerResult_scriptRunnerRequestId_key" ON "ScriptRunnerResult"("scriptRunnerRequestId");

-- AddForeignKey
ALTER TABLE "FileWatcher" ADD CONSTRAINT "FileWatcher_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogMessage" ADD CONSTRAINT "LogMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
