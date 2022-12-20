import { makeAutoObservable } from "mobx";
import servicesStore from "./servicesStore";
import { MenuActionType } from '../types/types';
import { IService } from '../types/types';

const { addService, patchService } = servicesStore;

class FormStore {
  payload: any = null;
  id: string = '';
  defaultFormData: IService = {
    servicename: '',
    price: '',
    description: '',
    active: false
  };
  
  constructor() {
    makeAutoObservable(this);
  }

  setDefaultFormData = (data: IService) => {
    this.defaultFormData = data;
  }

  clearForm = () => {
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
        addService(this.payload);
        break;
      case 'EDIT':
        patchService(this.id, this.payload);
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