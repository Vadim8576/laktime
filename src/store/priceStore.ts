import { makeAutoObservable } from "mobx";
import pricesAPI from "../api/priceAPI";
import { IPriceList } from './priceStoreTypes';




class PriceStore {
  priceList: IPriceList[] = [];
  priceError: boolean = false;
  priceIsLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }


  getPriceStore() {
    return {
      priceIsLoading: this.priceIsLoading,
      priceList: this.priceList,
      priceError: this.priceError
    }
  }

  setPrices(prices: IPriceList[]) {
    this.priceList = prices;
  }

  setLoading(priceIsLoading: boolean) {
    this.priceIsLoading = priceIsLoading;
  }

  setError(error: boolean) {
    this.priceError = error;
  }

  addPrice(price: IPriceList) {
    this.priceList.push(price);
  }

  // patchPrice(id: number) {
  //   this.priceList = this.priceList.map((price: IPriceList) => {
  //     if(price.id === id) 
  //   })
  // }

  deletePrice(id: number) {
    this.priceList = this.priceList.filter((price: IPriceList) => price.id !== id);
  }

  deleteAllPrice() {
    this.priceList = [];
  }

  async getPrices() {
    const response = await pricesAPI.getPrices();

    if(response.status === 'ok') {
      this.setLoading(false);
      this.setPrices(response.data);
    }
    else {
      // Вывести ошибку!
      console.log(response.message)
    }
  }
}

export default new PriceStore();