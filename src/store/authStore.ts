import { makeAutoObservable } from "mobx";
import authAPI from "../api/authAPI";
import { IAuthContext } from "../context/authContextTypes";
import { IUser } from "./authStoreTypes";



class Authorization {

  user: IUser = null;
  isAuth: IAuthContext = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(name: IUser) {
    this.user = name;
  }
  
  setAuth(isAuth: IAuthContext) {
    this.isAuth = isAuth;
  }


  login() {
    authAPI.login().then((response: any) => {
      response = response.data;
      const token = response.data.token;
      const refreshToken = response.data.refreshToken;

      console.log('response: ', response)
      console.log('token: ', token)
      console.log('refreshToken: ', refreshToken)

      if (response.ok) {
  
        const userName = response.data.nickname;

        this.setUser(userName);
        this.setAuth(true);
      }

    }).catch((error: any) => {
      this.setAuth(false);  
    })
  }

  logout() {
    this.setAuth(false);
    this.setUser(null);

  }
  
}

export default new Authorization();

