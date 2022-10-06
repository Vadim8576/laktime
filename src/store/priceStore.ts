import { makeAutoObservable, toJS } from "mobx";
import pricesAPI from "../api/priceAPI";
import { IPriceList, IPrice } from './storeTypes';


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
    console.log('addPrice API')
    this.setError('');
    this.setSuccess(false);
    
    // const response = await pricesAPI.addPrice(price, formData);
    const response = await pricesAPI.addPrice(price);

    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getPrices();

    } else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }

  }

  patchPrice = async (id: string, price: IPrice) => {
    this.setError('');
    this.setSuccess(false);

    const response = await pricesAPI.patchPrice(id, price);

    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getPrices();
    } else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }
  }

  deletePrice = async (id: string) => {
    
    this.setError('');
    this.setSuccess(false);
    
    const response = await pricesAPI.deletePrice(id);
    
    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getPrices();
    } else {
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
      this.setPrices([]);
    } else {
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
    } else {
      // Вывести ошибку!
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    } 
  }


  getOnePrice(id2: string): IPrice {
    let list = this.priceList.filter((price) => price.id === id2)[0];
    let list2: IPrice = {
      servicename: list.servicename,
      price: list.price,
      description: list.description,
      active: list.active
    }
    return list2;
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