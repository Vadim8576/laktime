import { makeAutoObservable } from "mobx";
import authAPI from "../api/authAPI";
import { IAuthContext } from "../context/authContextTypes";
import { IUser } from "./authStoreTypes";
import { setTokenToLocalStorage } from '../helpers/localStorage';



class Authorization {

  user: IUser = null;
  isAuth: IAuthContext = false;
  // token: string | null = null;
  // refreshToken: string | null = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUser(name: IUser) {
    this.user = name;
  }

  setAuth(isAuth: IAuthContext) {
    this.isAuth = isAuth;
  }

  setToken(token: string) {
    // this.token = token;
    setTokenToLocalStorage('token', token);
  }

  setRefreshToken(refreshToken: string) {
    // this.refreshToken = refreshToken;
    setTokenToLocalStorage('refreshToken', refreshToken);
  }


  async login() {
    let response = await authAPI.login();

    if (response.status === 'ok') {
      console.log(response)


      const userName = response.nickname;
      this.setUser(userName);
      this.setAuth(true);
      this.setToken(response.data.token);
      this.setRefreshToken(response.data.refreshToken);
    } else {
      // Вывести ошибку!
      console.log(response.message)
    }
  }

  logout() {
    this.setAuth(false);
    this.setUser(null);
  }

}

export default new Authorization();

