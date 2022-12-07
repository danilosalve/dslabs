export interface Product {
  id: string,
  description: string;
  price: number,
  unitOfMeasurement: string,
  photo: string,
  group: string,
  stockBalance?: number
}
