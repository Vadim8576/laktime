import { useState, useEffect } from "react";

export const useSelectedItems = (ids: number[]): boolean => {
  const [itemsSelected, setItemsSelected] = useState<boolean>(false);
  
  useEffect(() => {
    setItemsSelected(ids.length > 0);  
  }, [ids])

  return itemsSelected;
}

