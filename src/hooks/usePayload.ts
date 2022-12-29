import formStore from "../store/formStore";
import { ContextMenuAction } from '../types/types';


const usePayload = () => {

  // const getFormState = formStore.getFormState();

  const setPayload = (payload: any) => {
    formStore.setPayload(payload);
  }

  const setId = (id: number) => {
    formStore.setId(id);
  }

  const formOnSubmit = (type: ContextMenuAction) => {
    formStore.onSubmit(type);
  }

  return {setPayload, setId, formOnSubmit}
}


export default usePayload;