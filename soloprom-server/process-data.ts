import * as fs from 'fs';
import * as path from 'path';

async function processJsonData(): Promise<void> {
  try {
    const filePath = path.join(
      process.cwd(),
      './src/data/productDescription.json',
    );
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    if (!Array.isArray(jsonData)) {
      throw new Error('JSON data is not an array.');
    }

    const modelCounts: { [model: string]: number } = {};

    for (const item of jsonData) {
      if (item.models && Array.isArray(item.models)) {
        for (const model of item.models) {
          const trimmedModel = model.trim();
          if (trimmedModel) {
            modelCounts[trimmedModel] = (modelCounts[trimmedModel] || 0) + 1;
          }
        }
      }
    }

    // Сортировка по количеству (от большего к меньшему)
    const sortedModels = Object.entries(modelCounts).sort(
      ([, countA], [, countB]) => countB - countA,
    ); // Сортировка по убыванию количества

    // Преобразование обратно в объект
    const sortedModelCounts: { [model: string]: number } = {};
    sortedModels.forEach(([model, count]) => {
      sortedModelCounts[model] = count;
    });

    const outputPath = path.join(process.cwd(), 'models-result.json');
    fs.writeFileSync(outputPath, JSON.stringify(sortedModelCounts, null, 2));

    console.log(`Results written to ${outputPath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

processJsonData();
