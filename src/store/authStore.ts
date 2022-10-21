import { makeAutoObservable } from "mobx";
import authAPI from "../api/authAPI";
import { setTokenToLocalStorage } from '../helpers/localStorage';
import { IUser } from './storeTypes';
import { getErrorMessage } from '../helpers/getErrorMessage';



class Authorization {

  user: IUser = null;
  isAuth: Boolean = false;
  authError: string = '';
  // token: string | null = null;
  // refreshToken: string | null = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (name: IUser) => {
    this.user = name;
  }

  setAuth = (isAuth: Boolean) => {
    this.isAuth = isAuth;
  }

  setError = (error: string) => {
    this.authError = error;
  }

  setToken = (token: string) => {
    // this.token = token;
    setTokenToLocalStorage('token', token);
  }

  setRefreshToken = (refreshToken: string) => {
    // this.refreshToken = refreshToken;
    setTokenToLocalStorage('refreshToken', refreshToken);
  }



  login = async() => {
    try {
      const response = await authAPI.login();

      if (response.status === 'ok') {
        console.log(response)

        const userName = response.nickname;
        this.setUser(userName);
        this.setAuth(true);
        this.setToken(response.data.token);
        this.setRefreshToken(response.data.refreshToken);
      }
    } catch (error: any) {
      this.setError('Ошибка авторизации!');
    }
  }

  logout = () => {

    console.log('logout')
    this.setAuth(false);
    this.setUser(null);
    this.setToken('');
    this.setRefreshToken('');
  }

}

export default new Authorization();

