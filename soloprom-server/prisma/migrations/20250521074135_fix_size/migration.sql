/*
  Warnings:

  - You are about to drop the column `height` on the `Battery` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Battery` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Battery` table. All the data in the column will be lost.
  - Added the required column `size` to the `Battery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battery" DROP COLUMN "height",
DROP COLUMN "length",
DROP COLUMN "width",
ADD COLUMN     "size" TEXT NOT NULL;
