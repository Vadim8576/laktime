import axios, { AxiosError, AxiosResponse } from "axios";
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getTokenFromLocalStorage } from '../helpers/localStorage';
import { toJS } from 'mobx';
import { IPortfolioList } from '../store/storeTypes';
import { Console } from "console";


export interface IPortfolioData {
    data: IPortfolioList;
}

export interface IPortfolioResponse {
    data: IPortfolioList[];
    status: string;
    error: string;
}


const instance: any = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        withCredentials: true, // делаем запрос от авторизованного пользователя
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        'x-access-token': getTokenFromLocalStorage('token'),
    }
});



const portfolioAPI = {
    getImages() {
        return instance
            .get('images/')
            .then((response: AxiosResponse<IPortfolioData>) => {
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    uploadImages(images: any) {
        return instance
            .post(`images/`, images)
            .then((response: AxiosResponse<IPortfolioData>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    deleteImage(id: string) {
        return instance
            .delete(`image/${id}`)
            .then((response: AxiosResponse<IPortfolioData>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },
    
    deleteAllImages() {
        return instance
            .delete(`images/`)
            .then((response: AxiosResponse<IPortfolioData>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    }

}

export default portfolioAPI;

