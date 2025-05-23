/*
  Warnings:

  - You are about to drop the column `battery_size` on the `batteries` table. All the data in the column will be lost.
  - You are about to drop the column `plate_type` on the `batteries` table. All the data in the column will be lost.
  - Added the required column `plates` to the `batteries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizes` to the `batteries` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "batteries_voltage_container_battery_size_plate_type_idx";

-- AlterTable
ALTER TABLE "batteries" DROP COLUMN "battery_size",
DROP COLUMN "plate_type",
ADD COLUMN     "plates" TEXT NOT NULL,
ADD COLUMN     "sizes" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "batteries_voltage_container_sizes_plates_idx" ON "batteries"("voltage", "container", "sizes", "plates");
