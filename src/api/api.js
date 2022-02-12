import dataReport  from './module/dataReport'
import User from './module/user'

let Apply = {}
let api = {}


api['dataReport'] = dataReport
api['user'] = User
Apply = {
  install: function (Vue, options) {
    Vue.prototype.$Apply = api
  }
}

export default Apply
