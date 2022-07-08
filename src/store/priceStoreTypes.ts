export interface IPrice {
  servicename: string;
  price: string;
  description: string
  active: string;
}

export interface IPriceList extends IPrice {
  id: string;
}