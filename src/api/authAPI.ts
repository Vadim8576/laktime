import axios, { AxiosResponse, AxiosError } from "axios";
import { getErrorMessage } from "../helpers/getErrorMessage";

interface IAuthResponse {
    data: {
        email: string;
        nickname: string;
        refreshToken: string;
        token: string;
    }
}


const instance: any = axios.create({
    baseURL: 'http://localhost:4000/user/',
    headers: {
        withCredentials: true,
        'Content-Type': 'application/json',
        'api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    }
});

const body = {
    email: 'admin101@mail.ru',
    password: '123'
}

const authAPI = {
    login() {
        return instance
            .post('login', body)
            .then((response: AxiosResponse<IAuthResponse>) =>{
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


export default authAPI;