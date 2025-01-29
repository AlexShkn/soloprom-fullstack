export interface ProductSize {
  [key: string]: number;
}
export interface ProductDto {
  id: string;
  name: string;
  price: number;
  stock: number;
  models: string[];
  sizes: ProductSize;
}
