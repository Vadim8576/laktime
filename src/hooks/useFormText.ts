import { IService } from '../store/storeTypes';

const useFormText = (defaultFormData: IService) => {
  return (
    defaultFormData.servicename == '' &&
    defaultFormData.price == '' &&
    defaultFormData.description == ''
  )
  ? 'Добавить услугу'
  : 'Редактировать запись';
}

export default useFormText;