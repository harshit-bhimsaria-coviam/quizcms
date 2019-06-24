import Vue from 'vue'
import Vuex from 'vuex'
import commonApi from '../api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screeningData: {},
    categoryData: {}
  },
  mutations: {
    screening_data: (state, data)=>{
      state.screeningData = data;
    },
    category_data: (state, data)=>{
      state.categoryData = data;
    }
  },
  actions: {
    getScreeningDataFromCMS: ({commit}, {data, success})=>{
      commonApi.getScreeningData(data,(response)=>{
        commit('screening_data', response.body)
        console.log(response.body)
        success()
        //alert('Success')
      },()=>{
        alert('Data Get Failure!!')
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
    getCategories: ({commit}, success)=>{
      commonApi.getCategories((response)=>{
        commit('category_data', response.body)
        success()
        //alert('Success')
      },()=>{
        alert('Category Call Failure!!')
      })
    }
  },
  getters: {
    getScreeningData: state => {
      return state.screeningData;
    },
    getCategoryData: state=> {
      return state.categoryData;
    }
  }
})
