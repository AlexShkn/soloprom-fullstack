-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "ProductDescr" ADD COLUMN     "options" JSONB;
