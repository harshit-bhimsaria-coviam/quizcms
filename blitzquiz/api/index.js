import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const mayururl="http://172.16.26.39:9081";
const amanurl ="http://172.16.26.65:8080";
const salilurl="http://172.16.26.53:8081";

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
    
    Vue.http.delete(mayururl+"/questionbank/delete?queNo="+quesNo+"&category="+category, {headers: headerObject}).then((res) => {
        cb(res)

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
  uploadFile(data, email, cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'multipart/form-data'
    }
    Vue.http.post(salilurl+"/uploadfile/"+email, data, {headers: headerObject}).then((res) => {
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
    Vue.http.post(salilurl+"/preferences", data, {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  },
  getAllUsers(cb, errorHandler) {
    let headerObject = {
        'Content-Type': 'application/json'
    }
    Vue.http.get(salilurl+"/getInfo", {headers: headerObject}).then((res) => {
        cb(res)
    }, (error) => {
        errorHandler(error)
    })
  }
}

export default commonApi;