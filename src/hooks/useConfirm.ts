import confirmDialogStore from "../store/confirmDialogStore";


let resolveCallback: (bool: boolean) => void;

const useConfirm = () => {
    const confirmState = confirmDialogStore.confirmState();
    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };
    const confirm = (text: string) => {
      confirmDialogStore.showConfirm(text);
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        confirmDialogStore.hideConfirm();
    };

    return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;