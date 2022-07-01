import { makeAutoObservable } from "mobx";
import pricesAPI from "../api/priceAPI";
import { IPrice, IPriceList } from './priceStoreTypes';




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

  async addPrice(price: IPrice) {
    // this.priceList.push(price);
    const response = await pricesAPI.addPrice(price);

  }

  // patchPrice(id: number) {
  //   this.priceList = this.priceList.map((price: IPriceList) => {
  //     if(price.id === id) 
  //   })
  // }

  async deletePrice(id: string) {
    const response = await pricesAPI.deletePrice(id);

    console.log(response)
    
    if(response.status === 'ok') {
      let priceList = this.priceList.filter((price: IPriceList) => price.id !== id);
      this.setPrices(priceList);
    }
    else {
      // Вывести ошибку!
      console.log(response.message)
    }
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