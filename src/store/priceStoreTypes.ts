export interface IPrice {
  service: string;
  price: string;
  description: string
  active: boolean;
}

export interface IPriceList extends IPrice {
  id: string;
}