import { makeAutoObservable } from "mobx"
import authAPI from "../api/authAPI"

class Authorization {

  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  login() {
    authAPI.login().then((response: any) => {
      const resp = response.data;

      const token = resp.data.token
      const refreshToken = resp.data.refreshToken

      console.log('token: ', token)
      console.log('refreshToken: ', refreshToken)


      if (resp.ok) {
        this.isAuth = true
      }
    }).catch((error: any) => {
      this.isAuth = false
    })
  }
  
}

export default new Authorization()

