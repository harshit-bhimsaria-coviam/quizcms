import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const mayururl="http://172.16.26.39:9081";
const amanurl ="http://172.16.26.65:8080";
const salilurl="";

const commonApi = {
  getScreeningData(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.get(mayururl+'/questionbank/getAll/' + data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  setScreenedData(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.post(amanurl+"/screener/saveScreenedQuestion", data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  setUnScreenedData(quesNo, category, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    console.log(mayururl+"/questionbank/delete?queNo="+quesNo+"&category="+category)
    Vue.http.delete(mayururl+"/questionbank/delete?queNo="+quesNo+"&category="+category, {headers: headerObject}).then((res) => {
        cb(res)
        console.log(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  getCategories(cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.get(amanurl+"/categoryManagement/getCategories", {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  uploadFile(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'multipart/form-data'
    }
    Vue.http.post("http://172.16.26.45:8080/uploadfile", data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  crawlerData(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.get("http://172.16.26.42:8080/getRawData?website="+data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  savePreferences(data, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.post(salilurl+"", data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  }
}

export default commonApi;