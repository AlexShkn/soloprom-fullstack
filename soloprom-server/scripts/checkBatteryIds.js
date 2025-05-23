const fs = require('node:fs');

function checkDuplicateModelsAndFindDefaultSizes(batteryDataPath, allDataPath) {
  try {
    const batteryData = fs.readFileSync(batteryDataPath, 'utf8');
    const allData = fs.readFileSync(allDataPath, 'utf8');

    const batteryJson = JSON.parse(batteryData);
    const allJson = JSON.parse(allData);

    const duplicateModels = [];
    const invalidBatteries = [];
    const foundDefaultSizes = [];

    batteryJson.batteries.forEach((battery) => {
      const batteryId = battery.batteryId;

      // Проверка схемы для каждого объекта battery
      if (
        !batteryId ||
        !battery.voltage ||
        !battery.defaultSize ||
        !battery.plates ||
        !battery.container ||
        !battery.compatibleVehicles
      ) {
        invalidBatteries.push(batteryId);
        return; // Пропускаем дальнейшую обработку, если схема неверна
      }
      if (
        typeof battery.voltage !== 'string' ||
        typeof battery.defaultSize !== 'string' ||
        typeof battery.container !== 'string' ||
        typeof battery.plates !== 'string'
      ) {
        invalidBatteries.push(batteryId);
        return;
      }

      const models = {};

      battery.compatibleVehicles.forEach((vehicle) => {
        // Проверка схемы для каждого объекта vehicle
        if (!vehicle.vehicleType || !vehicle.brand || !vehicle.model) {
          invalidBatteries.push(batteryId);
          return; // Пропускаем дальнейшую обработку для этого vehicle
        }

        const model = vehicle.model;
        if (models[model]) {
          duplicateModels.push({ batteryId: batteryId, model: model });
        } else {
          models[model] = true;
        }
      });

      // Поиск defaultSize в all.json
      const defaultSizeResult = findDefaultSize(battery.defaultSize, allJson);
      if (defaultSizeResult) {
        foundDefaultSizes.push({
          batteryId: batteryId,
          defaultSize: battery.defaultSize,
        });
      }
    });

    return { duplicateModels, invalidBatteries, foundDefaultSizes };
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    return { duplicateModels: [], invalidBatteries: [], foundDefaultSizes: [] };
  }
}

function findDefaultSize(defaultSizeValue, allJson) {
  if (!defaultSizeValue) {
    return null;
  }

  if (!Array.isArray(allJson)) {
    console.warn('all.json is not an array.  Check your data file.');
    return null;
  }

  for (const item of allJson) {
    if (item.defaultSize === defaultSizeValue) {
      return item.defaultSize;
    }
  }

  return null;
}

const batteryDataPath = './data/filters/battery-data.json';
const allDataPath = './data/all.json';

const { duplicateModels, invalidBatteries, foundDefaultSizes } =
  checkDuplicateModelsAndFindDefaultSizes(batteryDataPath, allDataPath);

if (duplicateModels.length > 0) {
  console.log('Duplicate models found:', duplicateModels);
} else {
  console.log('No duplicate models found within compatibleVehicles.');
}

if (invalidBatteries.length > 0) {
  console.log(
    'Invalid batteries (missing fields or incorrect types):',
    invalidBatteries,
  );
} else {
  console.log('All batteries conform to the schema.');
}

if (foundDefaultSizes.length > 0) {
  console.log('Found defaultSizes:', foundDefaultSizes);
} else {
  console.log('No defaultSizes found in all.json for specified batteries.');
}
