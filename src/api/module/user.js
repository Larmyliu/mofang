import Axios from "./axios";
const qs = require('querystring')
const http = Axios.getAxiosConfig();
// import axios from "axios"
const Url = {
  login: '/user/login',
  register: '/user/register',
}

const User = {
  login(data){
    return http.post(Url.login, data)
  },

  register(data){
    return http.post(Url.register, data)
  }
}

export default User
