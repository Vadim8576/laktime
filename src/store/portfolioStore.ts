import { makeAutoObservable, toJS } from "mobx";
import portfolioAPI from "../api/portfolioAPI";
import { IPortfolioList } from '../types/types';
import { getErrorMessage } from '../helpers/getErrorMessage';
import authStore from "./authStore";



class PortfolioStore {
  portfolioList: IPortfolioList[] = [];
  portfolioIsLoading: boolean = true;
  portfolioError: string = '';
  portfolioSuccess: boolean = false;
  logout = authStore.logout;

  constructor() {
    makeAutoObservable(this);
  }

  resetFlags = () => {
    this.setLoading(true);
    this.setError('');
    this.setSuccess(false);
  }

  setImages = (images: IPortfolioList[]) => {
    this.portfolioList = images;
  }

  setLoading = (isLoading: boolean) => {
    this.portfolioIsLoading = isLoading;
  }

  setError = (error: string) => {
    this.portfolioError = error;
  }

  setSuccess = (success: boolean) => {
    this.portfolioSuccess = success;
  }

  uploadImages = async (images: any) => {
    this.resetFlags();
    try {
      const response = await portfolioAPI.uploadImages(images);
      if(response.status === 'ok') { 
        this.setSuccess(true);
        this.setImages(response.data);
      }
    }
    catch (error: any) {
      (error.response.status === 403) && this.logout();
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  
  deleteImage = async (id: string) => { 
    this.resetFlags();  
    try {
      const response = await portfolioAPI.deleteImage(id);  
      if(response.status === 'ok') {
        this.setSuccess(true);
        this.setImages(response.data);
      }
    }
    catch (error: any) {
      (error.response.status === 403) && this.logout();
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    }
  }

  deleteAllImages = async () => {
    this.resetFlags();  
    try {
      const response = await portfolioAPI.deleteAllImages();
      if(response.status === 'ok') {
        this.setSuccess(true);
        this.setImages([]);
      }
    }
    catch (error: any) {
      (error.response.status === 403) && this.logout();
      this.setError(getErrorMessage(error).error);
    } finally {
      this.setLoading(false);
    }
  }

  getImages = async () => {
    this.resetFlags();
    try {
      const response = await portfolioAPI.getImages();
      if(response.status === 'ok')  {
        this.setImages(response.data);
      }
    }
    catch(error: any) {
      this.setError(getErrorMessage(error).error);
    }
    finally {
      this.setLoading(false);
    } 
  }

  get sortImages() {
    const sort = 'id'; //сотировка по ID
    // переписать функцию для сортировки по буквам
    // const sort = 'servicename';   
    return [...this.portfolioList].sort((a: IPortfolioList, b: IPortfolioList) => parseInt(a[sort]) - parseInt(b[sort]));
  }

  get imageListLength() {
    return this.portfolioList.length;
  }

}

export default new PortfolioStore();