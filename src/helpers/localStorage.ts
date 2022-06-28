export const setTokenToLocalStorage = (nameStorage: string, data: string) => {
  localStorage.setItem(nameStorage, data);
}

export const getTokenFromLocalStorage = (nameStorage: string): string => {
  return localStorage.getItem(nameStorage) || '';
}