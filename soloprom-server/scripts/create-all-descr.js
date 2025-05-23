// sync-descr.js
const fs = require('fs');

const allProductsPath = '../data/all.json';
const productDescriptionsPath = '../data/productDescription.json';
const allFullProductsPath = '../output/all-descr-full.json';

function syncDescriptions() {
  try {
    const allProductsData = fs.readFileSync(allProductsPath, 'utf-8');
    const productDescriptionsData = fs.readFileSync(
      productDescriptionsPath,
      'utf-8',
    );

    const allProducts = JSON.parse(allProductsData);
    const productDescriptions = JSON.parse(productDescriptionsData);

    const allFullProducts = allProducts.map((product) => {
      const description = productDescriptions.find(
        (descr) => descr.productId === product.productId,
      );
      console.log(product);

      if (description) {
        return {
          productId: description.productId,
          name: description.name,
          text: description.text,
          models: description.models,
          options: description.options,
        };
      } else {
        return {
          productId: product.productId,
          name: product.name,
          text: null,
          models: [],
          options: [],
        };
      }
    });

    fs.writeFileSync(
      allFullProductsPath,
      JSON.stringify(allFullProducts, null, 2),
      'utf-8',
    );
    console.log('Successfully synced descriptions and created all-full.json');
  } catch (error) {
    console.error('Error during synchronization:', error);
  }
}

syncDescriptions();
