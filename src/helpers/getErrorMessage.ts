import { AxiosError } from "axios";


export const getErrorMessage = (error: AxiosError) => {
  if (error.response) {
    const err = error.response?.data
    return {
      message: err ? err : 'Сервер не отвечает, попробуйте позже.',
      status: 'error'
    }
  } else if (error.request) {
    return {
      message: 'Сервер не отвечает, попробуйте позже.',
      status: 'error'
    }
  } else {
    return {
      message: 'Что-то пошло не так!',
      status: 'error'
    }
  }
} 