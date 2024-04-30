-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" SERIAL NOT NULL,
    "policyCodeGlobalVersion" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);
