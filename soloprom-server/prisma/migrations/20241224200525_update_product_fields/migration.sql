/*
  Warnings:

  - Added the required column `productType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "container" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "load_index" TEXT,
ADD COLUMN     "plates" TEXT,
ADD COLUMN     "productType" TEXT NOT NULL,
ADD COLUMN     "voltage" TEXT;
