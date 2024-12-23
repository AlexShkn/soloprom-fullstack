/*
  Warnings:

  - Added the required column `categoryName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD COLUMN     "subcategoryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryName_fkey" FOREIGN KEY ("subcategoryName") REFERENCES "SubCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
