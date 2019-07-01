import Vue from 'vue'
import Vuex from 'vuex'
import commonApi from '../api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screeningData: {},
    categoryData: {},
    preferenceData: {},
    allUserData: {},
    categories: [],
    ScreenedQuestion:{},
    data:{},
    storedState: {},
    score: '',
    allcontestData: {}
  },
  mutations: {
    allcontest_data: (state, data) => {
      state.allcontestData = data
    },
    screening_data: (state, data) => {
      state.screeningData = data;
    },
    category_data: (state, data) => {
      state.categoryData = data;
    },
    preference_data: (state, data) => {
      state.preferenceData = data;
    },
    all_user_data: (state, data) => {
      state.allUserData = data;
    },
    CATEGORIES_UPDATE: (state, categories) => {
      state.categories = categories
      console.log(state.categories)
    },
    SCREENED_QUESTION:(state,data)=>{
      state.ScreenedQuestion=data
    },
    DATA:(state,data)=>{
      state.data=data
    },
    STORED_STATE_UPDATE: (state, storedState) => {
      state.storedState = storedState
    },
    SCORE_UPDATE: (state, points) => {
      state.score = points
      console.log("Points1: ", points)
      console.log("Points1: ", state.score)
    }
  },
  actions: {
    getScreeningDataFromCMS: ({ commit }, { data, success }) => {
      commonApi.getScreeningData(data, (response) => {
        commit('screening_data', response.body)
        success()
        //alert('Success')
      }, () => {
        alert('Data Get Failure!!')
      })
    },
    getCategories: ({ commit }, success) => {
      commonApi.getCategories((response) => {
        commit('category_data', response.body)
        success()
        //alert('Success')
      }, () => {
        alert('Category Call Failure!!')
      })
    },
    setScreenedData: (obj, { data, success }) => {
      commonApi.setScreenedData(data, () => {
        //commit('screening_data', response.body)
        alert('Screened Data Sent')
        success()
      }, () => {
        alert('Screened Data Post Failure!!')
      })
    },
    setUnScreenedData: (obj, {unsceenedData, success}) => {
      commonApi.setUnScreenedData(unsceenedData, () => {
        // commit('screening_data', response.body)
        alert('Unscreened Data Sent')
        success()
      }, () => {
        alert('UnScreened Data Post Failure!!')
      })
    },
    savePreferences: ({ commit }, data) => {
      commonApi.savePreferences(data, () => {
        commit('preference_data', data);
      }, (error) => {
        alert(error.body)
      })
    },
    uploadFile: (obj, { formData, email }) => {
      commonApi.uploadFile(formData, email, (response) => {
        console.log(response.bodyText)
      }, (error) => {
        alert(error.bodyText)
      })
    },
    getAllUsers: ({ commit }) => {
      commonApi.getAllUsers((response) => {
        commit('all_user_data', response.body)
      }, () => {
        alert("All User Call Failed")
      })
    },
    setCategories: ({commit}, categories) => {
      commit('CATEGORIES_UPDATE', categories)
    },
    getCategories1: (obj, {url, success, failure}) => {
      commonApi.getCategories1(url,
        (response) => {
          success(response)
        },
        (error) => {
          failure(error)
        })
    },
    setQuiz: (obj, {url, data, success, failure}) => {
      commonApi.setQuiz(
        url, data, 
        (response) => {
          success(response)
        },
        (error) => {
          failure(error)
        }
      )
    },
    getScreenedQuestion: ({commit}, {url, success, failure}) => {
      commonApi.getCategories1(url,
        (response) => {
          commit('SCREENED_QUESTION',response.body)
          success(response)
          console.log(response,'inside setter')
        },
        (error) => {
          failure(error)
        })
    },
    setData: ({commit}, data) => {
      commit('DATA', data)
    },
    getContest: (obj, {url, contestId, success, failure}) => {
      commonApi.getContest(
        url, contestId, 
        (response) => {
          success(response)
        },
        (error) => {
          failure(error)
        }
      )
    },
    setQuizState: (obj, {url, state, success, failure}) => {
      commonApi.setQuizState(
        url, state, 
        (response) => {
          debugger
          success(response)
        },
        (error) => {
          failure(error)
        }
      )
    },
    getQuizState: ({commit}, {url, success, failure}) => {
      commonApi.getQuizState(
        url, 
        (response) => {
          debugger
          commit('STORED_STATE_UPDATE', response.body)
          success(response)
        },
        (error) => {
          failure(error)
        }
      )
    },
    saveQuizStateInitially: ({commit}, {url, state, success, failure}) => {
      commonApi.saveQuizStateInitially(
        url, state, 
        (response) => {
          debugger
          commit('STORED_STATE_UPDATE', response.body[0])
          success(response)
        },
        (error) => {
          debugger
          failure(error)
        }
      )
    },
    updateQuizState: (obj, {url, state, success, failure}) => {
      commonApi.updateQuizState(
        url, state, 
        (response) => {
          success(response)
        },
        (error) => {
          failure(error)
        }
      )
    },
    saveScore: ({commit}, {url, state, success, failure}) => {
      commonApi.saveScore(
        url, state, 
        (response) => {
          commit('SCORE_UPDATE', response.body[0].points)
          success(response)
        },
        (error) => {
          failure(error)
        }
      )
    },
    getAllContests: ({commit}) =>{
      commonApi.getAllContests((response)=>{
        commit('allcontest_data', response.body)
      },()=>{alert("Get all contest failure!!")})
    }
  },
  getters: {
    getScreeningData: state => {
      return state.screeningData;
    },
    getCategoryData: state => {
      return state.categoryData;
    },
    getPreferencesData: state => {
      return state.preferenceData;
    },
    getAllUserData: state => {
      return state.allUserData;
    },
    getCategoriesFromStore: state => {
      return state.categories;
    },
    getScreenedQuestionFromStore: state => {
      return state.ScreenedQuestion;
    },
    getData: state => {
      return state.data;
    },
    getStoredStateFromStore: state => {
      return state.storedState;
    },
    getScoreFromStore: state => {
      return state.score;
    },
    getAllContestsData: state => {
      return state.allcontestData;
    }
  }
})
