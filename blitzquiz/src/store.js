import Vue from 'vue'
import Vuex from 'vuex'
import commonApi from '../api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screeningData: {},
    categoryData: {},
    preferenceData: {},
    allUserData: {}
  },
  mutations: {
    screening_data: (state, data)=>{
      state.screeningData = data;
    },
    category_data: (state, data)=>{
      state.categoryData = data;
    },
    preference_data: (state, data)=>{
      state.preferenceData = data;
    },
    all_user_data: (state, data)=>{
      state.allUserData = data;
    }
  },
  actions: {
    getScreeningDataFromCMS: ({commit}, {data, success})=>{
      commonApi.getScreeningData(data,(response)=>{
        commit('screening_data', response.body)
        success()
        //alert('Success')
      },()=>{
        alert('Data Get Failure!!')
      })
    },
    getCategories: ({commit}, success)=>{
      commonApi.getCategories((response)=>{
        commit('category_data', response.body)
        success()
        //alert('Success')
      },()=>{
        alert('Category Call Failure!!')
      })
    },
    setScreenedData: ({commit}, {data, success})=>{
      commonApi.setScreenedData(data,()=>{
        //commit('screening_data', response.body)
        alert('Screened Data Sent')
        success()
      },()=>{
        alert('Screened Data Post Failure!!')
      })
    },
    setUnScreenedData: ({commit}, {quesNo, category})=>{
      commonApi.setUnScreenedData(quesNo, category,()=>{
        // commit('screening_data', response.body)
        alert('Unscreened Data Sent')
      },()=>{
        alert('UnScreened Data Post Failure!!')
      })
    },
    savePreferences:({commit}, data)=>{
      commonApi.savePreferences(data,()=>{
        commit('preference_data', data);
      },(error)=>{
        alert(error.body)
      })
    },
    uploadFile:({commit}, {formData, email})=>{
      commonApi.uploadFile(formData,email,(response)=>{
        console.log(response.bodyText)
      },(error)=>{
          alert(error.bodyText)
      })
    },
    getAllUsers:({commit})=>{
      commonApi.getAllUsers((response)=>{
        commit('all_user_data', response.body)
      },()=>{
        alert("All User Call Failed")
      })
    }
  },
  getters: {
    getScreeningData: state => {
      return state.screeningData;
    },
    getCategoryData: state=> {
      return state.categoryData;
    },
    getPreferencesData: state => {
      return state.preferenceData;
    },
    getAllUserData: state=>{
      return state.allUserData;
    }
  }
})
