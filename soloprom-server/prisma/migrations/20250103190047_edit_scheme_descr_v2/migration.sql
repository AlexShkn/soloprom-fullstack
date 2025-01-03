/*
  Warnings:

  - You are about to drop the column `name` on the `ProductDescription` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `ProductDescription` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `ProductDescription` table. All the data in the column will be lost.
  - The `models` column on the `ProductDescription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductDescription" DROP COLUMN "name",
DROP COLUMN "reviews",
DROP COLUMN "text",
ADD COLUMN     "description" TEXT,
DROP COLUMN "models",
ADD COLUMN     "models" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "productDescriptionId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productDescriptionId_fkey" FOREIGN KEY ("productDescriptionId") REFERENCES "ProductDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
