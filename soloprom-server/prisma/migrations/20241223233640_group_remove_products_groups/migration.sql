/*
  Warnings:

  - You are about to drop the `_ProductGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_name_fkey";

-- DropForeignKey
ALTER TABLE "_ProductGroups" DROP CONSTRAINT "_ProductGroups_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductGroups" DROP CONSTRAINT "_ProductGroups_B_fkey";

-- DropTable
DROP TABLE "_ProductGroups";

-- CreateTable
CREATE TABLE "_GroupToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GroupToProduct_B_index" ON "_GroupToProduct"("B");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToProduct" ADD CONSTRAINT "_GroupToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToProduct" ADD CONSTRAINT "_GroupToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
