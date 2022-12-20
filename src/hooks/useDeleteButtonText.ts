import { useState, useEffect } from "react";

export type IDeleteButtonText = 'Удалить выбранные' | 'Удалить все';

export const useDeleteButtonText = (ids: number[]): IDeleteButtonText => {

  const [deleteButtonText, setDeleteButtonText] = useState<IDeleteButtonText>('Удалить все');

  useEffect(() => {
    setDeleteButtonText(ids.length > 0 ? 'Удалить выбранные' : 'Удалить все');
  }, [ids])

  return deleteButtonText;
}

