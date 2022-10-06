export type IUser = string | null;

export interface IPrice {
  servicename: string;
  price: string;
  description: string;
  active: boolean;
}

export interface IPriceList extends IPrice {
  id: string;
}

export interface IPortfolio {
  image_id: string;
  image_path: string;
}

export interface IPortfolioList extends IPortfolio {
  id: string;
}


