import axios from "axios";


const instance: any = axios.create({
    baseURL: 'http://localhost:4000/user/',
    headers: {
        withCredentials: true, // делаем запрос от авторизованного пользователя
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
            .then((response: any) => response)
    }
    
}

export default authAPI;