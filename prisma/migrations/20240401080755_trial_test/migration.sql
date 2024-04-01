/*
  Warnings:

  - You are about to drop the column `name` on the `Widgets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tab]` on the table `Dashboards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wid` to the `Widgets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Widgets_name_idx";

-- AlterTable
ALTER TABLE "Widgets" DROP COLUMN "name",
ADD COLUMN     "wid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dashboards_tab_key" ON "Dashboards"("tab");

-- CreateIndex
CREATE INDEX "Dashboards_tab_idx" ON "Dashboards"("tab");

-- CreateIndex
CREATE INDEX "Widgets_wid_idx" ON "Widgets"("wid");
