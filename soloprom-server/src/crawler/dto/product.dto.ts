export interface ProductSize {
  [key: string]: number;
}
export interface ProductDto {
  id: string;
  name: string;
  price: number;
  models: string[];
  sizes: ProductSize;
}
