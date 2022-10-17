import { makeAutoObservable, toJS } from "mobx";
import pricesAPI from "../api/priceAPI";
import { IPriceList, IPrice } from './storeTypes';
import { getErrorMessage } from '../helpers/getErrorMessage';


class PriceStore {
  priceList: IPriceList[] = [];
  priceIsLoading: boolean = true;
  priceError: string = '';
  priceSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetFlags = () => {
    this.setLoading(true);
    this.setError('');
    this.setSuccess(false);    
  }

  setPrices = (prices: IPriceList[]) => {
    this.priceList = prices;
  }

  setLoading = (priceIsLoading: boolean) => {
    this.priceIsLoading = priceIsLoading;
  }

  setError = (error: string) => {
    this.priceError = error;
  }

  setSuccess = (success: boolean) => {
    this.priceSuccess = success;
  }

  addPrice = async (price: IPrice) => {
    this.resetFlags();

    try {
      const response = await pricesAPI.addPrice(price);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setPrices(response.data);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  patchPrice = async (id: string, price: IPrice) => {
    this.resetFlags();

    try {
      const response = await pricesAPI.patchPrice(id, price);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setPrices(response.data);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  deletePrice = async (id: string) => {
    this.resetFlags();

    try {
      const response = await pricesAPI.deletePrice(id);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setPrices(response.data);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
    
  }

  deleteAllPrice = async () => {
    this.resetFlags();

    try {
      const response = await pricesAPI.deleteAllPrice();
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setPrices([]);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  getPrices = async () => {
    this.resetFlags();

    try {
      const response = await pricesAPI.getPrices();
      if(response.status === 'ok') { 
        this.setPrices(response.data);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }


  getPriceValues(priceId: string): IPrice {
    const value = this.priceList.filter((price) => price.id === priceId)[0];
    const  { id, ...newValue } = {...value};
    return newValue;
  }

  get sortPrice() {
    const sort = 'id'; //сотировка по ID
    // переписать функцию для сортировки по буквам
    // const sort = 'servicename'; //сотировка по ID
    return [...this.priceList].sort((a: IPriceList, b: IPriceList) => parseInt(a[sort]) - parseInt(b[sort]));
  }

  get priceListLength() {
    return this.priceList.length;
  }

}

export default new PriceStore();
