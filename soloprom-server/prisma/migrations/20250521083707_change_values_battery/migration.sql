/*
  Warnings:

  - You are about to drop the column `capacity` on the `Battery` table. All the data in the column will be lost.
  - You are about to drop the column `plateType` on the `Battery` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Battery` table. All the data in the column will be lost.
  - Added the required column `container` to the `Battery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultSize` to the `Battery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plates` to the `Battery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battery" DROP COLUMN "capacity",
DROP COLUMN "plateType",
DROP COLUMN "size",
ADD COLUMN     "container" TEXT NOT NULL,
ADD COLUMN     "defaultSize" TEXT NOT NULL,
ADD COLUMN     "plates" TEXT NOT NULL;
