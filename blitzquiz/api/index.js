import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const mayururl = "http://172.16.26.46:9081";
const amanurl = "http://172.16.26.33:8080";
const salilurl = "http://172.16.26.37:8081";
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
  'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const commonApi = {
  getScreeningData(data, cb, errorHandler) {
    Vue.http.get(mayururl + '/questionbank/getAll/' + data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setScreenedData(data, cb, errorHandler) {
    Vue.http.post(amanurl + "/screener/saveScreenedQuestion", data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setUnScreenedData(unsceenedData, cb, errorHandler) {
    Vue.http.post(mayururl + "/questionbank/saveAllQuestions", unsceenedData, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getCategories(cb, errorHandler) {
    Vue.http.get(amanurl + "/categoryManagement/getCategories", { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  uploadFile(data, email, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'multipart/form-data'
    }
    Vue.http.post(salilurl + "/uploadfile/" + email, data, { headerObject }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getCrawlerData(cb, errorHandler) {
    Vue.http.get("http://172.16.26.42:8080/findWebsiteData", { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setCrawlerData(data, cb, errorHandler) {
    Vue.http.post("http://172.16.26.42:8080/saveWebsiteData", data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  startCrawler(cb, errorHandler) {
    Vue.http.get("http://172.16.26.42:8080/startCrawlerService", { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  stopCrawler(cb, errorHandler) {
    Vue.http.get("http://172.16.26.42:8080/stopCrawlerService", { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  savePreferences(data, cb, errorHandler) {
    Vue.http.post(salilurl + "/preferences", data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getAllUsers(cb, errorHandler) {
    Vue.http.get(salilurl + "/getInfo", { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  updatePermissions(data, cb, errorHandler) {
    Vue.http.post(salilurl + "/updateRole", data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getContestByCategory(name, page, cb, errorHandler) {
    Vue.http.get(amanurl + "/cms/getContestByCategory/" + name + "/" + page, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getCategories1(path, cb, errorHandler) {
    Vue.http.get(path, { headers }).then((res) => {
      console.log(res, "new ")
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  setQuiz(url, data, cb, errorHandler) {
    console.log("data", data)
    Vue.http.post(url, data, { headers }).then((res) => {
      console.log(res, "fdhdzschfdhjkjhgfdfhjkjhgfdfghjk")
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },
  getContest(url, contestId, cb, errorHandler) {
    Vue.http.get(url + contestId, { headers }).then((res) => {
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },

  setQuizState(url, state, cb, errorHandler) {
    Vue.http.get(url + state, { headers }).then((res) => {
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },

  getQuizState(url, cb, errorHandler) {
    Vue.http.get(url, { headers }).then((res) => {
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },

  saveQuizStateInitially(url, state, cb, errorHandler) {
    Vue.http.post(url, state,  { headers }).then((res) => {
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },

  updateQuizState(url, state, cb, errorHandler) {
    Vue.http.post(url , state, { headers }).then((res) => {
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },

  saveScore(url, state, cb, errorHandler) {
    Vue.http.post(url , state, { headers }).then((res) => {
      cb(res)
    }, (err) => {
      errorHandler(err)
    })
  },
  updateProfile(data, cb, errorHandler) {
    Vue.http.post(salilurl + "/updateProfile", data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getOne(data, cb, errorHandler) {
    Vue.http.get(salilurl + "/getOne/"+data, { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  getAllContests(cb, errorHandler) {
    Vue.http.get(amanurl + "/cms/getAllContests", { headers }).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  }
}

export default commonApi;