/*
  Warnings:

  - You are about to drop the column `status` on the `ScriptRunnerRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScriptRunnerRequest" DROP COLUMN "status",
ADD COLUMN     "Status" "ScriptRunnerStatus" NOT NULL DEFAULT 'pending';
