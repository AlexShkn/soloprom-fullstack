import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

interface Product {
  name: string;
  descr: string;
  url: string;
  img: string;
  defaultPrice: number;
  delivery: string;
  sizes: { [key: string]: number } | null;
  volumes: { [key: string]: number } | null;
  isPopular: boolean;
  size: null;
  discount: null;
  models: string[];
  regalia: string[];
  productId: string;
  categoryName: string;
  subcategoryName: string;
  container: string | null;
  country: string;
  load_index: string | null;
  plates: string | null;
  productType: string;
  voltage: string | null;
  stock: number;
  brandName: string;
  rating: number;
  groupsList: { name: string }[];
  viscosity: string | null;
  images: string[];
  defaultSize?: string;
}

interface ProductDescription {
  productId: string;
  name: string;
  text: string;
  models: string[];
  options: string[][];
}

@Module({})
class AppModule {
  async onModuleInit() {
    try {
      const dataDirectory =
        'F:/WORK/PROJECTS/soloprom-fullstack/soloprom-server/data';
      const allProductsFilePath = path.join(dataDirectory, 'all.json');
      const productDescriptionsFilePath = path.join(
        dataDirectory,
        'productDescription.json',
      );

      const allProductsData = await fs.readFile(allProductsFilePath, 'utf-8');
      const products: Product[] = JSON.parse(allProductsData);

      const productDescriptionsData = await fs.readFile(
        productDescriptionsFilePath,
        'utf-8',
      );
      const productDescriptions: ProductDescription[] = JSON.parse(
        productDescriptionsData,
      );

      let newProducts: Product[] = [];
      let newProductDescriptions: ProductDescription[] = [];

      for (const product of products) {
        let hasMultipleSizesOrVolumes = false;

        if (product.sizes && Object.keys(product.sizes).length > 1) {
          hasMultipleSizesOrVolumes = true;
          for (const size in product.sizes) {
            const newProductId = `${product.productId}-${size}`;
            const newProduct: Product = {
              ...product,
              productId: newProductId,
              url: `${product.url}-${size}`,
              defaultSize: size,
              defaultPrice: product.sizes[size],
              sizes: null,
              volumes: null,
            };
            newProducts.push(newProduct);

            // Copy and update description
            const oldDescription = productDescriptions.find(
              (desc) => desc.productId === product.productId,
            );

            if (oldDescription) {
              const newDescription: ProductDescription = {
                ...oldDescription,
                productId: newProductId,
              };
              newProductDescriptions.push(newDescription);
            }
          }
        } else if (product.volumes && Object.keys(product.volumes).length > 1) {
          hasMultipleSizesOrVolumes = true;
          for (const volume in product.volumes) {
            const newProductId = `${product.productId}-${volume}`;
            const newProduct: Product = {
              ...product,
              productId: newProductId,
              url: `${product.url}-${volume}`,
              defaultSize: volume,
              defaultPrice: product.volumes[volume],
              sizes: null,
              volumes: null,
            };
            newProducts.push(newProduct);

            // Copy and update description
            const oldDescription = productDescriptions.find(
              (desc) => desc.productId === product.productId,
            );

            if (oldDescription) {
              const newDescription: ProductDescription = {
                ...oldDescription,
                productId: newProductId,
              };
              newProductDescriptions.push(newDescription);
            }
          }
        }

        if (!hasMultipleSizesOrVolumes) {
          let updatedProduct = { ...product };
          let newProductId = product.productId;

          if (product.sizes && Object.keys(product.sizes).length === 1) {
            const size = Object.keys(product.sizes)[0];
            updatedProduct = { ...updatedProduct, defaultSize: size };
          }

          if (product.volumes && Object.keys(product.volumes).length === 1) {
            const volume = Object.keys(product.volumes)[0];
            updatedProduct = { ...updatedProduct, defaultSize: volume };
          }

          if (
            product.categoryName === 'battery' ||
            product.categoryName === 'oils'
          ) {
            const sizeOrVolume = updatedProduct.defaultSize;
            if (sizeOrVolume) {
              newProductId = `${updatedProduct.productId}-${sizeOrVolume}`;
              updatedProduct = {
                ...updatedProduct,
                productId: newProductId,
                url: `${updatedProduct.url}-${sizeOrVolume}`,
              };
            }
          }
          updatedProduct.sizes = null;
          updatedProduct.volumes = null;

          newProducts.push(updatedProduct);

          // Copy description (if needed, update productId)
          const oldDescription = productDescriptions.find(
            (desc) => desc.productId === product.productId,
          );

          if (oldDescription) {
            let newDescription: ProductDescription;
            if (newProductId !== product.productId) {
              newDescription = {
                ...oldDescription,
                productId: newProductId,
              };
            } else {
              newDescription = { ...oldDescription };
            }
            newProductDescriptions.push(newDescription);
          }
        }
      }

      const sizesRebaseFilePath = path.join(dataDirectory, 'sizes-rebase.json');
      await fs.writeFile(
        sizesRebaseFilePath,
        JSON.stringify(newProducts, null, 2),
        'utf-8',
      );

      const productDescriptionRebaseFilePath = path.join(
        dataDirectory,
        'productDescriptionRebase.json',
      );
      await fs.writeFile(
        productDescriptionRebaseFilePath,
        JSON.stringify(newProductDescriptions, null, 2),
        'utf-8',
      );

      console.log(
        `Файл sizes-rebase.json успешно создан в ${sizesRebaseFilePath}`,
      );
      console.log(
        `Файл productDescriptionRebase.json успешно создан в ${productDescriptionRebaseFilePath}`,
      );
    } catch (error) {
      console.error('Ошибка при обработке файла:', error);
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.close();
}

bootstrap();
