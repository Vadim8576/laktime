import { IPrice } from '../store/storeTypes';

const useFormText = (defaultFormData: IPrice) => {
  return (
    defaultFormData.servicename == '' &&
    defaultFormData.price == '' &&
    defaultFormData.description == ''
  )
  ? 'Добавить услугу'
  : 'Редактировать запись';
}

export default useFormText;