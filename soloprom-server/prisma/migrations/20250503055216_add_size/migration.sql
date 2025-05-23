/*
  Warnings:

  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `volumes` on the `Product` table. All the data in the column will be lost.
  - Added the required column `defaultSize` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes",
DROP COLUMN "volumes",
ADD COLUMN     "defaultSize" TEXT NOT NULL;
