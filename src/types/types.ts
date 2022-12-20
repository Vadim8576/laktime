export type MenuActionType = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL' | 'DELETE-ARRAY';


//************* Start AuthStore Types *************
export type IUser = string | null;
//************* End AuthStore Types *************


//************* Start Services Types *************
export interface IService {
  servicename: string;
  price: string;
  description: string;
  active: boolean;
}
export interface IServicesList extends IService {
  id: string;
}
export interface IServicesContextMenu {
  actionName: string;
  actionType: MenuActionType;
  confirmed: boolean;
}
//************* End Services Types *************


//************* Start Portfolio Types *************
export interface IPortfolio {
  image_id: string;
  image_path: string;
}
export interface IPortfolioList extends IPortfolio {
  id: string;
}
export interface IPortfolioResponse {
  data: IPortfolioList;
}
//************* End Portfolio Types *************
