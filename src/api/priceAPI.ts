import axios, { AxiosResponse } from "axios";
import { getTokenFromLocalStorage } from '../helpers/localStorage';
import { toJS } from 'mobx';
import { IPrice } from '../store/storeTypes';


interface IPriceResponse {
    data: {
        id: number;
        service: string;
        price: string;
        active: boolean;
    }
}


const API_KEY = process.env.REACT_APP_API_KEY as string;
const TOKEN_HEADER_NAME = process.env.REACT_APP_TOKEN_HEADER_NAME  as string; // например "x-access-token"
const BASE_URL = process.env.REACT_APP_BASE_URL as string;


const instance: any = axios.create({
    baseURL: BASE_URL,
    headers: {
        withCredentials: true, // делаем запрос от авторизованного пользователя
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'api-key': API_KEY,
    }
});


const pricesAPI = {
    getPrices() {
        return instance
            .get('price')
            .then((response: AxiosResponse<IPriceResponse>) => {
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    addPrice(price: IPrice) {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .post(`price/`, {...price})
            .then((response: AxiosResponse<IPriceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    patchPrice(id: string, price: IPrice) {    
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .put(`price/${id}`, {...price})
            .then((response: AxiosResponse<IPriceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    deletePrice(id: string) {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .delete(`price/${id}`)
            .then((response: AxiosResponse<IPriceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },
    
    deleteAllPrice() {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .delete(`price/`)
            .then((response: AxiosResponse<IPriceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    }

}

export default pricesAPI;

