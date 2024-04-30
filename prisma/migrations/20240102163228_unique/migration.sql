/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `Sender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mac]` on the table `Sender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostname]` on the table `Sender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationName]` on the table `Sender` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sender_ip_key" ON "Sender"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "Sender_mac_key" ON "Sender"("mac");

-- CreateIndex
CREATE UNIQUE INDEX "Sender_hostname_key" ON "Sender"("hostname");

-- CreateIndex
CREATE UNIQUE INDEX "Sender_applicationName_key" ON "Sender"("applicationName");
