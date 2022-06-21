import axios, { AxiosError, AxiosResponse } from "axios";
import { getErrorMessage } from '../helpers/getErrorMessage';


interface IResponse {
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
        'api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    }
});

const pricesAPI = {
    getPrices() {
        return instance
            .get('price')
            .then((response: AxiosResponse<IResponse>) => {
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

