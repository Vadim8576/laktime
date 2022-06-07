import axios from "axios";


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
            .then((response: { data: any; }) => response.data)
    }
    
}

export default pricesAPI;