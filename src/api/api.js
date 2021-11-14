import dataReport  from './module/dataReport'


let Apply = {}
let api = {}


api['dataReport'] = dataReport
Apply = {
  install: function (Vue, options) {
    Vue.prototype.$Apply = api
  }
}

export default Apply
