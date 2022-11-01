import axios, { AxiosResponse } from "axios";


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
    login(payload: any) {
        return instance
            .post('login', payload)
            .then((response: AxiosResponse<IAuthResponse>) =>{
                return {
                    data: response.data.data,
                    status: 'ok'
                }
            })
    }
    
}


export default authAPI;