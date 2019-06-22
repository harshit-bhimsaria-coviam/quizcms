import Vue from 'vue'
import Vuex from 'vuex'
import commonApi from '../api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screeningData: {}
  },
  mutations: {
    screening_data: (state, data)=>{
      state.screeningData = data;
    }
  },
  actions: {
    getScreeningData: ({commit}, data)=>{
      commonApi.getScreeningData(data,(response)=>{
        commit('screening_data', response.body)
        alert('Success')
      },()=>{
        alert('Data Get Failure!!')
      })
    },
    setScreeningData: ({commit}, data)=>{
      commonApi.setScreeningData(data,(response)=>{
        commit('screening_data', response.body)
        alert('Success')
      },()=>{
        alert('Data Post Failure!!')
      })
    }
  },
  getters: {
    getScreeningData: state => {
      return state.screeningData;
    }
  }
})
