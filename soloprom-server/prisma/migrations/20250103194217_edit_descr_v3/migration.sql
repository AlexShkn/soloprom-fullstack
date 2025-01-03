/*
  Warnings:

  - You are about to drop the `ProductDescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductDescription" DROP CONSTRAINT "ProductDescription_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productDescriptionId_fkey";

-- DropTable
DROP TABLE "ProductDescription";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "ProductDescr" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT,
    "models" JSONB,
    "reviews" JSONB DEFAULT '[]',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDescr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductDescr_productId_key" ON "ProductDescr"("productId");

-- AddForeignKey
ALTER TABLE "ProductDescr" ADD CONSTRAINT "ProductDescr_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
