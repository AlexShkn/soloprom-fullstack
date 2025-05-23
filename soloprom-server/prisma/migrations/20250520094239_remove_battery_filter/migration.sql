/*
  Warnings:

  - You are about to drop the `batteries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `battery_tech_model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tech_models` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tech_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "battery_tech_model" DROP CONSTRAINT "battery_tech_model_batteryId_fkey";

-- DropForeignKey
ALTER TABLE "battery_tech_model" DROP CONSTRAINT "battery_tech_model_techModelId_fkey";

-- DropForeignKey
ALTER TABLE "tech_models" DROP CONSTRAINT "tech_models_tech_type_id_fkey";

-- DropTable
DROP TABLE "batteries";

-- DropTable
DROP TABLE "battery_tech_model";

-- DropTable
DROP TABLE "tech_models";

-- DropTable
DROP TABLE "tech_types";
