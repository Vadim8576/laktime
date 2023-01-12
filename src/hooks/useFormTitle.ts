import { IService } from '../types/types';

const useFormTitle = (defaultFormData: IService) => {
  return (
    defaultFormData.servicename === '' &&
    defaultFormData.price === '' &&
    defaultFormData.description === ''
  )
  ? 'Добавить услугу'
  : 'Редактировать запись';
}

export default useFormTitle;