-- DropForeignKey
ALTER TABLE "PopularProduct" DROP CONSTRAINT "PopularProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "PopularProduct" ADD CONSTRAINT "PopularProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
