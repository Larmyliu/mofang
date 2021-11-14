import Axios from "./axios";
const http = Axios.getAxiosConfig();
// import axios from "axios"
const Url = {

  uploadData: '/upload/test',
}

const dataReport = {
  uploadData(data){
    return http.post(Url.uploadData, data)
  }
}

export default dataReport
