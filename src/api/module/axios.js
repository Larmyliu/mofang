import axios from "axios";

const timeOut = 50000
const headers = {
  'Content-Type': 'application/json',
}
let baseURL = ""   // 本地
export default class {
  static getAxiosConfig(config = {}) {
    // let hostName = process.env.NODE_ENV === 'development'?'development':location.host;
    const gdprAxios = axios.create({
      baseURL: config.baseURL || baseURL,
      timeout: config.timeout || timeOut,
      headers: config.headers || headers,
      withCredentials: true,
      transformRequest: [function (data, headers) {
        if(headers['Content-Type'] == 'multipart/form-data') {
          return data;
        }
        if (!data || typeof data === 'undefined') {
          data = {}
        }
        return JSON.stringify(data)
      }],
      validateStatus: function (status) {
        return status >= 200 && status < 300 // default
      }
    })
    gdprAxios.interceptors.response.use(function (res) {
      return res
    }, function (err) {
      if (err.message.includes(`timeout of ${timeOut}ms exceeded`)) {
        Message.error('系统超时!!')
      }
    })
    return gdprAxios;
  }

  static getBaseURL() {
    return baseURL;
  }
}
