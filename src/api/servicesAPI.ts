import axios, { AxiosResponse } from "axios";
import { getTokenFromLocalStorage } from '../helpers/localStorage';
import { toJS } from 'mobx';
import { IService } from '../types/types';
import QueryString from "qs";


interface IServiceResponse {
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
    },
    paramsSerializer: (params) => QueryString.stringify(params, { indices: false }),
});


const servicesAPI = {
    getServices() {
        return instance
            .get('services')
            .then((response: AxiosResponse<IServiceResponse>) => {
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    getService(id: string) {
        return instance
            .get(`services/${id}`)
            .then((response: AxiosResponse<IServiceResponse>) => {
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    addService(service: IService) {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .post(`services/`, {...service})
            .then((response: AxiosResponse<IServiceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    patchService(id: string, service: IService) {    
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .put(`services/${id}`, {...service})
            .then((response: AxiosResponse<IServiceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    deleteService(id: string) {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .delete(`services/${id}`)
            .then((response: AxiosResponse<IServiceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },
    
    deleteAllServices(idsOfSelectedItems: number[]) {
        // const arr = [345, 347]
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .delete(`services/`, {params: {ids: [...idsOfSelectedItems]}})
            .then((response: AxiosResponse<IServiceResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    }

}

export default servicesAPI;

