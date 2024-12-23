/*
  Warnings:

  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `container` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `load_index` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `plates` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_group` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `viscosity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `voltage` on the `Product` table. All the data in the column will be lost.
  - The `models` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regalia` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
DROP COLUMN "container",
DROP COLUMN "country",
DROP COLUMN "load_index",
DROP COLUMN "plates",
DROP COLUMN "product_group",
DROP COLUMN "radius",
DROP COLUMN "type",
DROP COLUMN "viscosity",
DROP COLUMN "voltage",
DROP COLUMN "models",
ADD COLUMN     "models" JSONB,
DROP COLUMN "regalia",
ADD COLUMN     "regalia" JSONB;

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE INDEX "_ProductGroups_B_index" ON "_ProductGroups"("B");

-- AddForeignKey
ALTER TABLE "_ProductGroups" ADD CONSTRAINT "_ProductGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductGroups" ADD CONSTRAINT "_ProductGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
