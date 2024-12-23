-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_name_fkey" FOREIGN KEY ("name") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
