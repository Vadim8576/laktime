export type ContextMenuAction = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL' | 'DELETE-ARRAY';


//************* Start AuthStore Types *************
export type IUser = string | null;
//************* End AuthStore Types *************


//************* Start Services Types *************
export interface IService {
  servicename: string;
  price: string;
  description: string;
  active: boolean;
  image_name: string;
}
export interface IServicesList extends IService {
  id: number;
}
export interface IServicesContextMenu {
  actionName: string;
  actionType: ContextMenuAction;
  confirmed: boolean;
}
//************* End Services Types *************


//************* Start Portfolio Types *************
export interface IPortfolio {
  image_id: number;
  image_name: string;
}
export interface IPortfolioList extends IPortfolio {
  id: number;
}
export interface IPortfolioResponse {
  data: IPortfolioList;
}
//************* End Portfolio Types *************
export interface Event<T = EventTarget> {
  target: T;
}