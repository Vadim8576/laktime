import { makeAutoObservable } from "mobx";
import servicesStore from "./servicesStore";
import { MenuActionType } from '../types/types';
import { IService } from '../types/types';

const { addService, patchService, deleteService, deleteAllServices } = servicesStore;

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

  

  onSubmit = (type: MenuActionType, idsOfSelectedItems: number[]) => {
    console.log(type)
    switch(type) {
      case 'ADD':
        addService(this.payload);
        break;
      case 'EDIT':
        patchService(this.id, this.payload);
        break;
      case 'DELETE':
        deleteService(this.id);
        break;
      case 'DELETE-ALL':
        deleteAllServices(idsOfSelectedItems);
        break;
      case 'DELETE-ARRAY':
        deleteAllServices(idsOfSelectedItems);
        console.log('Удалить выбранные')
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