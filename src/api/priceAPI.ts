import axios, { AxiosError, AxiosResponse } from "axios";
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getTokenFromLocalStorage } from '../helpers/localStorage';


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
        'Content-Type': 'application/json',
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
    }

}

export default pricesAPI;

