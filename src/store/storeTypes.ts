export type IUser = string | null;

export interface IService {
  servicename: string;
  price: string;
  description: string;
  active: boolean;
}

export interface IServicesList extends IService {
  id: string;
}

export interface IPortfolio {
  image_id: string;
  image_path: string;
}

export interface IPortfolioList extends IPortfolio {
  id: string;
}


