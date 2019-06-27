import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const mayururl = "http://172.16.26.39:9081";
const amanurl = "http://172.16.26.38:8080";
const salilurl = "http://172.16.26.45:8081";

const commonApi = {
  getScreeningData(data, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get(mayururl + '/questionbank/getAll/' + data, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setScreenedData(data, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.post(amanurl + "/screener/saveScreenedQuestion", data, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setUnScreenedData(unsceenedData, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.post(mayururl + "/questionbank/saveAllQuestions", unsceenedData, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getCategories(cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get(amanurl + "/categoryManagement/getCategories", { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  uploadFile(data, email, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'multipart/form-data'
    }
    Vue.http.post(salilurl + "/uploadfile/" + email, data, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getCrawlerData(cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get("http://172.16.26.42:8080/findWebsiteData", { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setCrawlerData(data, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.post("http://172.16.26.42:8080/saveWebsiteData", data, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  startCrawler(cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get("http://172.16.26.42:8080/startCrawlerService", { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  stopCrawler(cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get("http://172.16.26.42:8080/stopCrawlerService", { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  savePreferences(data, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.post(salilurl + "/preferences", data, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getAllUsers(cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get(salilurl + "/getInfo", { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  updatePermissions(data, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.post(salilurl + "/updateRole", data, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getContestByCategory(name, page, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Vue.http.get(amanurl + "/cms/getContestByCategory/"+name+"/"+page, { headers: headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  }
}

export default commonApi;