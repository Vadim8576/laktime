import { makeAutoObservable } from "mobx"
import pricesAPI from "../api/priceAPI"


export interface IPriceList {
  id: number;
  service: string;
  price: string;
  active: boolean;
  description?: string
}

class PriceStore {
  priceList: IPriceList[] = []
  priceError: boolean = false
  isLoading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  addPrice(price: IPriceList) {
    this.priceList.push(price)
  }

  // patchPrice(id: number) {
  //   this.priceList = this.priceList.map((price: IPriceList) => {
  //     if(price.id === id) 
  //   })
  // }

  deletePrice(id: number) {
    this.priceList = this.priceList.filter((price: IPriceList) => price.id !== id)
  }

  deleteAllPrice() {
    this.priceList = []
  }


  async getPrices() {
    this.priceList = await pricesAPI.getPrices()
      .then((response: any) => {
        this.isLoading = false
        return response.data
      })
      .catch((error: any) => {
        this.isLoading = false
        this.priceError = true
      })
  }

  
}

export default new PriceStore()