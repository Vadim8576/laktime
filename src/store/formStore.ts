import { makeAutoObservable } from "mobx";
import priceStore from "./priceStore";
import { MenuActionType } from '../components/pages/price/prices';
import { IPrice } from './storeTypes';


class FormStore {
  payload: any = null;
  id: string = '';
  defaultFormData: IPrice = {
    servicename: '',
    price: '',
    description: '',
    active: false
  };
  
  constructor() {
    makeAutoObservable(this);
  }

  setDefaultFormData = (data: IPrice) => {
    this.defaultFormData = data;
  }

  clearDefaultFormData = () => {
    this.defaultFormData = {
      servicename: '',
      price: '',
      description: '',
      active: false
    };
  }

  setPayload = (payload: any) => {
    this.payload = payload;
  }


  setId = (id: string) => {
    this.id = id;
  }

  onSubmit = (type: MenuActionType) => {
    console.log(type)
    switch(type) {
      case 'ADD':
        priceStore.addPrice(this.payload);
        break;
      case 'EDIT':
        priceStore.patchPrice(this.id, this.payload);
        break;
      case 'DELETE':
        priceStore.deletePrice(this.id);
        break;
      case 'DELETE-ALL':
        priceStore.deleteAllPrice();
        break;
      default:
        return
    }
    
  };

  formState = () => {
    return {payload: this.payload, id: this.id, defaultFormData: this.defaultFormData}
  }

}

export default new FormStore();