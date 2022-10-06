import axios, { AxiosError, AxiosResponse } from "axios";
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getTokenFromLocalStorage } from '../helpers/localStorage';
// import { IPrice } from '../store/priceStoreTypes';
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
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
            })
    },

    // addPrice(price: IPrice, formData: any) {

    //     console.log(toJS(price));
    //     console.log(formData);

    //     const priceWithFormData = {...price, formData};
    //     console.log('priceWithFormData = ', priceWithFormData);

    //     return instance
    //         // .post(`price/`, {...price, formData: formData}, {
    //         .post(`price/`, formData, {
    //             headers: {               
    //               'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    //             }
    //         })
    //         .then((response: AxiosResponse<IPriceResponse>) => {
    //             console.log(response)
    //             return {
    //                 data: response.data.data,
    //                 status: 'ok'
    //             }
    //         })
    //         .catch((error: AxiosError) => {
    //             return getErrorMessage(error);
    //         })
    // },
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
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
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
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
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
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
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
            .catch((error: AxiosError) => {
                return getErrorMessage(error);
            })
    }

}

export default pricesAPI;

