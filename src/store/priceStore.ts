import { makeAutoObservable, toJS } from "mobx";
import pricesAPI from "../api/priceAPI";
import { IPrice, IPriceList } from './priceStoreTypes';




class PriceStore {
  priceList: IPriceList[] = [];
  priceIsLoading: boolean = true;
  priceError: string = '';
  priceSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPrices = (prices: IPriceList[]) => {
    this.priceList = prices;
  }

  setLoading = async (priceIsLoading: boolean) => {
    this.priceIsLoading = priceIsLoading;
  }

  setError = (error: string) => {
    this.priceError = error;
  }

  setSuccess = (success: boolean) => {
    this.priceSuccess = success;
  }

  addPrice = async (price: IPrice) => {
    this.setError('');
    this.setSuccess(false);
    
    const response = await pricesAPI.addPrice(price);

    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getPrices();
    }
    else {
      // Вывести ошибку!
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }

  }

  patchPrice = async (id: string) => {
    // const response = await pricesAPI.deletePrice(id);
    console.log('priceStore > Patch')
  }

  deletePrice = async (id: string) => {
    
    this.setError('');
    this.setSuccess(false);
    
    const response = await pricesAPI.deletePrice(id);
    
    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getPrices();
    }
    else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }
  }

  deleteAllPrice = async () => {
    this.setError('');
    this.setSuccess(false);
    
    const response = await pricesAPI.deleteAllPrice();
    
    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getPrices();
    }
    else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }
  }

  getPrices = async () => {
    this.setError('');
    const response = await pricesAPI.getPrices();
  
    if(response.status === 'ok') {
      this.setLoading(false);
      this.setPrices(response.data);
      console.log(toJS(this.priceList))
    }
    else {
      // Вывести ошибку!
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    } 
  }

  get sortPrice() {
    const sort = 'id'; //сотировка по ID
    return [...this.priceList].sort((a: IPriceList, b: IPriceList) => parseInt(a[sort]) - parseInt(b[sort]));
  }

  get priceListLength() {
    return this.priceList.length;
  }


}

export default new PriceStore();