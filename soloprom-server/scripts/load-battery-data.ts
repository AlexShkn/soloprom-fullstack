const { PrismaClient } = require('@prisma/client');
const data = require('../data/filters/battery-data.json');
const prisma = new PrismaClient();

async function main() {
  try {
    for (const batteryData of data.batteries) {
      const {
        voltage,
        defaultSize,
        plates,
        container,
        compatibleVehicles,
        batteryId,
      } = batteryData;

      const battery = await prisma.battery.create({
        data: {
          batteryId,
          voltage,
          defaultSize,
          plates,
          container,
          compatibleVehicles: {
            connectOrCreate: compatibleVehicles.map((vehicle) => ({
              // Changed create to connectOrCreate
              where: {
                vehicleType_brand_model: {
                  // Имя уникального индекса
                  vehicleType: vehicle.vehicleType,
                  brand: vehicle.brand,
                  model: vehicle.model,
                },
              },
              create: {
                // Create is still needed
                vehicleType: vehicle.vehicleType,
                brand: vehicle.brand,
                model: vehicle.model,
              },
            })),
          },
        },
      });

      console.log(`Created battery with id: ${battery.id}`);
    }

    console.log('Data loading completed.');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
