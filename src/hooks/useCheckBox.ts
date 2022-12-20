import { useMemo } from "react";

export const useCheckBox = () => {

  const setNewIds = (ids: number[], id: number) => {
    let newIds: number[] = [];
    let checked: boolean = false;

    if (ids.includes(+id)) {
      newIds = ids.filter((checkedId: number) => checkedId !== +id);
    } else {
      newIds = [...ids, id];
    }

    checked = newIds.length === 0 ? false : newIds.includes(id);

    return newIds;
  }


  const checkboxChecked = (ids: number[], id: number) => {
    if (ids.length === 0) return false;
    return ids.includes(id);
  }

  return { setNewIds, checkboxChecked }

}