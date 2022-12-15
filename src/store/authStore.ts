import { makeAutoObservable } from "mobx";
import authAPI from "../api/authAPI";
import { setTokenToLocalStorage } from '../helpers/localStorage';
import { IUser } from '../types/types';
import { getErrorMessage } from '../helpers/getErrorMessage';



class Authorization {

  user: IUser = null;
  isAuth: boolean = false;
  authError: string = '';
  isFetching: boolean = false;
  // token: string | null = null;
  // refreshToken: string | null = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (name: IUser) => {
    this.user = name;
  }

  setAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  }

  setFethcing = (isFetching: boolean) => {
    this.isFetching = isFetching;
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



  login = async(payload: any) => {
    this.setFethcing(true);
    try {
      const response = await authAPI.login(payload);
      if (response.status === 'ok') {
        console.log(response)
        this.setUser(response.nickname);
        this.setAuth(true);
        this.setToken(response.data.token);
        this.setRefreshToken(response.data.refreshToken);
      }
    } catch (error: any) {
      this.setError('Ошибка авторизации!');
    } finally {
      this.setFethcing(false);
    }
  }

  logout = () => {
    this.setAuth(false);
    this.setUser(null);
    this.setToken('');
    this.setRefreshToken('');
  }

}

export default new Authorization();

