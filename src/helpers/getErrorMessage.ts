import { AxiosError } from "axios";


export const getErrorMessage = (error: AxiosError) => {

  if (error.response) {
    return (error.response.status === 403)
    ? {
      error: 'Нет доступа! Пожалуйста, авторизируйтесь',
      status: 'error'
    }
    : {
      error: 'Что-то пошло не так!',
      status: 'error'
    }

  } else if (error.request) {
    return {
      error: 'Сервер не отвечает, попробуйте позже.',
      status: 'error'
    }
  } else {
    return {
      error: 'Что-то пошло не так!',
      status: 'error'
    }
  }
  
} 