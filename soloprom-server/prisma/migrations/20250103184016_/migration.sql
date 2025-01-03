/*
  Warnings:

  - The `reviews` column on the `ProductDescription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `ProductDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductDescription" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "text" TEXT,
DROP COLUMN "reviews",
ADD COLUMN     "reviews" JSONB[];
