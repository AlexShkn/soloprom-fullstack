const fs = require('node:fs');

function transformBatteryData(filePath, outputPath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    jsonData.batteries = jsonData.batteries.map((battery) => {
      if (
        battery.length &&
        battery.width &&
        battery.height &&
        typeof battery.length === 'string' &&
        typeof battery.width === 'string' &&
        typeof battery.height === 'string'
      ) {
        const size = `${battery.length}x${battery.width}x${battery.height}`;
        delete battery.length;
        delete battery.width;
        delete battery.height;

        const newBattery = {
          batteryId: battery.batteryId,
          voltage: battery.voltage,
          size: size,
          plateType: battery.plateType,
          capacity: battery.capacity,
          compatibleVehicles: battery.compatibleVehicles,
        };

        return newBattery;
      }
      return battery; // Возвращаем исходный объект, если условия не выполняются
    });

    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(
      `Data transformation complete. New file created: ${outputPath}`,
    );
    return true; // Indicate success
  } catch (error) {
    console.error('Error reading, parsing, or writing JSON file:', error);
    return false; // Indicate failure
  }
}

const inputFilePath = './data/filters/battery-data.json';
const outputFilePath = './data/filters/transform-battery-data.json';

const success = transformBatteryData(inputFilePath, outputFilePath);

if (!success) {
  console.log('Data transformation failed.');
}
