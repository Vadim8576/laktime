import { makeAutoObservable } from "mobx";

class ConfirmDialogStore {
  show: boolean = false;
  text: string = '';
  
  constructor() {
    makeAutoObservable(this);
  }

  showConfirm = (text: string) => {
    this.show = true;
    this.text = text;
  }

  hideConfirm = () => {
    this.show = false;
    this.text = '';
  }

  confirmState = () => {
    return {show: this.show, text: this.text}
  };

}

export default new ConfirmDialogStore();