-- AlterTable
ALTER TABLE "ScriptRunnerRequest" ADD COLUMN     "status" "ScriptRunnerStatus" NOT NULL DEFAULT 'pending';
