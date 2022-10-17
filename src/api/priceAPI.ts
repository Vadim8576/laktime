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
        console.log(toJS(price));
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
        console.log(toJS(price));
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

