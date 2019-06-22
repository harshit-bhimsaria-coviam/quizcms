import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const cmsurl="";

const commonApi = {
  getScreeningData(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.get(cmsurl+"/"+data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  setScreeningData(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.post(cmsurl+"/", data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  }
}

export default commonApi;