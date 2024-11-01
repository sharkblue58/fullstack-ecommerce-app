export class Product {
  id: number = 0;
  sku: string = '';
  name: string = '';
  description: string = '';
  unitPrice: number = 0;
  imgUrl: string = '';
  active: boolean = false;
  unitsInStock: number = 0;
  dateCreated: Date = new Date();
  lastUpdated: Date = new Date();
}
