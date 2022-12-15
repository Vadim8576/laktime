import { useMemo } from "react";

export const useCheckBoxChecked = (idsOfSelectedItems: number[], id: number) => {
  return useMemo(() => {
    if(!idsOfSelectedItems) return false;
    return idsOfSelectedItems.includes(id);
  }, [idsOfSelectedItems, id])
}