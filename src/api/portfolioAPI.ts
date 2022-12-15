import axios, { AxiosResponse } from "axios";
import { getTokenFromLocalStorage } from '../helpers/localStorage';
import { toJS } from 'mobx';
import { IPortfolioList } from '../types/types';
import { IPortfolioResponse } from '../types/types'


const API_KEY = process.env.REACT_APP_API_KEY as string;
const TOKEN_HEADER_NAME = process.env.REACT_APP_TOKEN_HEADER_NAME as string;
const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const instance: any = axios.create({
    baseURL: BASE_URL,
    headers: {
        withCredentials: true,
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'api-key': API_KEY,
    }
})


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
    },

    uploadImages(images: any) {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .post(`images/`, images)
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },

    deleteImage(id: string) {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .delete(`image/${id}`)
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    },
    
    deleteAllImages() {
        instance.defaults.headers.common[TOKEN_HEADER_NAME] = getTokenFromLocalStorage('token');
        return instance
            .delete(`images/`)
            .then((response: AxiosResponse<IPortfolioResponse>) => {
                console.log(response)
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    }

}

export default portfolioAPI;

