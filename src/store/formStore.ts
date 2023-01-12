import { makeAutoObservable } from "mobx";
import servicesStore from "./servicesStore";
import { ContextMenuAction } from '../types/types';
import { IService } from '../types/types';

const { addService, patchService } = servicesStore;

class FormStore {
  payload: any = null;
  id: number | null = null;
  
  defaultFormData: IService = {
    servicename: '',
    price: '',
    description: '',
    active: true,
    image_name: ''
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
      active: true,
      image_name: ''
    };
  }

  setPayload = (payload: any) => {
    this.payload = payload;
  }

  setId = (id: number) => {
    this.id = id;
  }

  onSubmit = (type: ContextMenuAction) => {
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

  // getFormState = () => {
  //   return {payload: this.payload, id: this.id, defaultFormData: this.defaultFormData}
  // }
}

export default new FormStore();