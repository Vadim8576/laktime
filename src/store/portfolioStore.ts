import { makeAutoObservable, toJS } from "mobx";
import portfolioAPI from "../api/portfolioAPI";
import { IPortfolioList, IPortfolio } from './storeTypes';



class PortfolioStore {
  portfolioList: IPortfolioList[] = [];
  portfolioIsLoading: boolean = true;
  portfolioError: string = '';
  portfolioSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setImages = (images: IPortfolioList[]) => {
    this.portfolioList = images;
  }

  setLoading = async (imageIsLoading: boolean) => {
    this.portfolioIsLoading = imageIsLoading;
    console.log(this.portfolioIsLoading)
  }

  setError = (error: string) => {
    this.portfolioError = error;
  }

  setSuccess = (success: boolean) => {
    this.portfolioSuccess = success;
  }

  uploadImages = async (images: any) => {
    this.setError('');
    this.setSuccess(false);
    
    const response = await portfolioAPI.uploadImages(images);

    if(response.status === 'ok') {
      this.setSuccess(true);
      // this.getImages();
      let newImgList = [...this.portfolioList, ...images]
      this.setImages(newImgList);

    } else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }

  }

  
  deleteImage = async (id: string) => {  
    this.setError('');
    this.setSuccess(false);
    
    const response = await portfolioAPI.deleteImage(id);
    
    if(response.status === 'ok') {
      this.setSuccess(true);
      this.getImages();
    } else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }
  }

  deleteAllImages = async () => {
    this.setError('');
    this.setSuccess(false);
    
    const response = await portfolioAPI.deleteAllImages();
    
    if(response.status === 'ok') {
      this.setSuccess(true);
      this.setImages([]);
    } else {
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    }
  }

  getImages = async () => {
    this.setError('');
    const response = await portfolioAPI.getImages();
  
    if(response.status === 'ok') {
      this.setLoading(false);
      this.setImages(response.data);
      console.log(toJS(this.portfolioList))
    } else {
      // Вывести ошибку!
      console.log(response.error)
      this.setError(response.error);
      this.setLoading(false);
    } 
  }


  get sortImages() {
    const sort = 'id'; //сотировка по ID
    // переписать функцию для сортировки по буквам
    // const sort = 'servicename'; //сотировка по ID
    return [...this.portfolioList].sort((a: IPortfolioList, b: IPortfolioList) => parseInt(a[sort]) - parseInt(b[sort]));
  }

  get imageListLength() {
    return this.portfolioList.length;
  }

}

export default new PortfolioStore();