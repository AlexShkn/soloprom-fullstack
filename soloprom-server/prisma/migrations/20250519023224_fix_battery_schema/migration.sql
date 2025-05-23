-- CreateTable
CREATE TABLE "batteries" (
    "id" SERIAL NOT NULL,
    "voltage" INTEGER NOT NULL,
    "container" INTEGER NOT NULL,
    "battery_size" TEXT NOT NULL,
    "plate_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batteries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_models" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "tech_type_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battery_tech_model" (
    "batteryId" INTEGER NOT NULL,
    "techModelId" INTEGER NOT NULL,

    CONSTRAINT "battery_tech_model_pkey" PRIMARY KEY ("batteryId","techModelId")
);

-- CreateIndex
CREATE INDEX "batteries_voltage_container_battery_size_plate_type_idx" ON "batteries"("voltage", "container", "battery_size", "plate_type");

-- CreateIndex
CREATE INDEX "tech_models_tech_type_id_idx" ON "tech_models"("tech_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_models_brandName_modelName_key" ON "tech_models"("brandName", "modelName");

-- CreateIndex
CREATE UNIQUE INDEX "tech_types_name_key" ON "tech_types"("name");

-- AddForeignKey
ALTER TABLE "tech_models" ADD CONSTRAINT "tech_models_tech_type_id_fkey" FOREIGN KEY ("tech_type_id") REFERENCES "tech_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battery_tech_model" ADD CONSTRAINT "battery_tech_model_batteryId_fkey" FOREIGN KEY ("batteryId") REFERENCES "batteries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battery_tech_model" ADD CONSTRAINT "battery_tech_model_techModelId_fkey" FOREIGN KEY ("techModelId") REFERENCES "tech_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
