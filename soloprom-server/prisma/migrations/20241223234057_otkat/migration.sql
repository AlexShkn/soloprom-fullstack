/*
  Warnings:

  - You are about to drop the `_GroupToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToProduct" DROP CONSTRAINT "_GroupToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToProduct" DROP CONSTRAINT "_GroupToProduct_B_fkey";

-- DropTable
DROP TABLE "_GroupToProduct";

-- CreateTable
CREATE TABLE "_ProductGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductGroups_B_index" ON "_ProductGroups"("B");

-- AddForeignKey
ALTER TABLE "_ProductGroups" ADD CONSTRAINT "_ProductGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductGroups" ADD CONSTRAINT "_ProductGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
