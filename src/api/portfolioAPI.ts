import axios, { AxiosError, AxiosResponse } from "axios";
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getTokenFromLocalStorage } from '../helpers/localStorage';
import { toJS } from 'mobx';
import { IPrice, IPortfolio } from '../store/storeTypes';


interface IPortfolioResponse {
    data: {
        id: number;
        image_id: string;
        image_path: string;
    }
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
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
            })
    },

    uploadImages(images: any) {
        return instance
            .post(`images/`, images)
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
            })
    },

    deleteImage(id: string) {
        return instance
            .delete(`image/${id}`)
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
            })
    },
    
    deleteAllImages() {
        return instance
            .delete(`images/`)
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
            })
    }

}

export default portfolioAPI;

