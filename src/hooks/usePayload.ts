import formStore from "../store/formStore";
import { MenuActionType } from '../types/types';


const usePayload = () => {

  const formState = formStore.formState();

  const setPayload = (payload: any) => {
    formStore.setPayload(payload);
  }

  const setId = (id: string) => {
    formStore.setId(id);
  }

  const formOnSubmit = (type: MenuActionType, idsOfSelectedItems: number[] = []) => {
    formStore.onSubmit(type, idsOfSelectedItems);
  }

  return {setPayload, setId, formOnSubmit, formState}
}


export default usePayload;