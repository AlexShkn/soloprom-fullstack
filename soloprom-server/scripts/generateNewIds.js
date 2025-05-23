const fs = require('node:fs');

function generateNewBatteryData(filePath, outputPath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    const newBatteryData = { batteries: [] };

    jsonData.batteries.forEach((battery) => {
      const { voltage, length, width, height, plateType, capacity, ...rest } =
        battery; // Extract other properties
      const newBatteryId = `${voltage}${length}${width}${height}${plateType}${capacity}`;

      const newBattery = {
        batteryId: newBatteryId,
        voltage,
        length,
        width,
        height,
        plateType,
        capacity,
        ...rest, // Include other properties, if any
      };

      newBatteryData.batteries.push(newBattery);
    });

    fs.writeFileSync(outputPath, JSON.stringify(newBatteryData, null, 2)); // Write to output file

    console.log(`Successfully created new battery data file: ${outputPath}`);
  } catch (error) {
    console.error('Error reading or processing JSON file:', error);
  }
}

const filePath = './data/filters/battery-data.json'; // Path to your JSON data file
const outputPath = './data/filters/battery-data-new.json'; // Path for the new JSON file

generateNewBatteryData(filePath, outputPath);
