import { makeAutoObservable, toJS } from "mobx";
import servicesAPI from "../api/servicesAPI";
import { IServicesList, IService } from '../types/types';
import { getErrorMessage } from '../helpers/getErrorMessage';
import authStore from "./authStore";


class ServicesStore {
  servicesList: IServicesList[] = [];
  servicesIsLoading: boolean = true;
  servicesError: string = '';
  servicesSuccess: boolean = false;
  logout = authStore.logout;

  constructor() {
    makeAutoObservable(this);
  }

  resetFlags = () => {
    this.setLoading(true);
    this.setError('');
    this.setSuccess(false);    
  }

  setServices = (services: IServicesList[]) => {
    this.servicesList = services;
  }

  setLoading = (servicesIsLoading: boolean) => {
    this.servicesIsLoading = servicesIsLoading;
  }

  setError = (error: string) => {
    this.servicesError = error;
  }

  setSuccess = (success: boolean) => {
    this.servicesSuccess = success;
  }

  addService = async (service: any) => {
    this.resetFlags();

    try {
      const response = await servicesAPI.addService(service);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setServices(response.data);
      }
    }
    catch (error: any) {
      console.log(error)

      if(error.response.status === 403) this.logout();

      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  patchService = async (id: number | null, service: IService) => {
    if(!id || !service) return
    this.resetFlags();
    try {
      const response = await servicesAPI.patchService(id, service);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setServices(response.data);
      }
    }
    catch (error: any) {
      if(error.response.status === 403) this.logout();
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  deleteService = async (id: number) => {
    this.resetFlags();

    try {
      const response = await servicesAPI.deleteService(id);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setServices(response.data);
      }
    }
    catch (error: any) {
      if(error.response.status === 403) this.logout();
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
    
  }

  deleteAllServices = async (ids: number[] = []) => {
    this.resetFlags();

    try {
      const response = await servicesAPI.deleteAllServices(ids);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        // this.setServices([]);
        this.setServices(response.data);
      }
    }
    catch (error: any) {
      console.log(error)
      if(error.response.status === 403) this.logout();
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  getServices = async () => {
    this.resetFlags();

    try {
      const response = await servicesAPI.getServices();
      if(response.status === 'ok') { 
        this.setServices(response.data);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  getService = async (id: number) => {
    this.resetFlags();

    try {
      const response = await servicesAPI.getService(id);
      if(response.status === 'ok') { 
        this.setServices(response.data);
      }
    }
    catch (error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }


  getServiceValues(serviceId: number): IService {
    const value: IServicesList = this.servicesList.filter((service) => service.id === serviceId)[0];
    const  { id, ...newValue } = value;
    return newValue;
  }

  get sortServices() {
    const sort = 'id'; //сотировка по ID
    // переписать функцию для сортировки по буквам
    // const sort = 'servicename'; //сотировка по ID
    console.log(toJS(this.servicesList))
    return [...this.servicesList].sort((a: IServicesList, b: IServicesList) => (a[sort] - b[sort]));
  }

  get servicesListLength() {
    return this.servicesList.length;
  }

}

export default new ServicesStore();
