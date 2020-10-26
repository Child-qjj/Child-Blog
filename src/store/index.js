import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types={
  SET_USER:'SET_USER',
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
}
const state={
  user:{},
  isAuthenticated:false
}
const getters={
  isAuthenticated:state=>state.isAuthenticated,
  user:state=>state.user
}
const mutations={
  [types.SET_USER](state,user){
    if (user) state.user=user;
    else state.user={}
  },
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if (isAuthenticated) {
      state.isAuthenticated=isAuthenticated;
    }
    else state.isAuthenticated=false;
  }
}
const actions={
  setIsAuthenticated({commit},isAuthenticated){
    commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser({commit},user){
    commit(types.SET_USER,user)
  },
  clearCurrentState({ commit }){
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
