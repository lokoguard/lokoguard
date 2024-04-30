-- CreateTable
CREATE TABLE "ResourceStats" (
    "id" SERIAL NOT NULL,
    "CPUStats" JSONB NOT NULL DEFAULT '[]',
    "MemStat" JSONB NOT NULL DEFAULT '{}',
    "DiskStats" JSONB NOT NULL DEFAULT '[]',
    "TemperatureStats" JSONB NOT NULL DEFAULT '[]',
    "NetStat" JSONB NOT NULL DEFAULT '{}',
    "HostInfo" JSONB NOT NULL DEFAULT '{}',
    "RecordedAt" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "ResourceStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResourceStats" ADD CONSTRAINT "ResourceStats_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
