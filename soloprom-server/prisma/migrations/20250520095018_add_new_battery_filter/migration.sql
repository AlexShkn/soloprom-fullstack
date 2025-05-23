-- CreateTable
CREATE TABLE "Battery" (
    "id" SERIAL NOT NULL,
    "voltage" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "plateType" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BatteryToVehicle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BatteryToVehicle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vehicleType_brand_model_key" ON "Vehicle"("vehicleType", "brand", "model");

-- CreateIndex
CREATE INDEX "_BatteryToVehicle_B_index" ON "_BatteryToVehicle"("B");

-- AddForeignKey
ALTER TABLE "_BatteryToVehicle" ADD CONSTRAINT "_BatteryToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Battery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatteryToVehicle" ADD CONSTRAINT "_BatteryToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
