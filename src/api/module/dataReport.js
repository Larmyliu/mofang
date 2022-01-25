import Axios from "./axios";
const qs = require('querystring')
const http = Axios.getAxiosConfig();
// import axios from "axios"
const Url = {
  uploadData: '/upload/uploadData',
  getListName: '/upload/getListName',
  getDataByName: '/upload/getDataByName'
}

const dataReport = {
  uploadData(data){
    return http.post(Url.uploadData, data)
  },
  getListName(){
    return http.get(Url.getListName)
  },
  getDataByName(data){
    return http.post(Url.getDataByName, data)
  }
}

export default dataReport
