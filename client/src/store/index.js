import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false // 로그인이 되어 있는지 확인하는 상태
    },
    mutations: { // 스테이트 값을 변경하는 녀석
        isLogin(state, payload) {
            return state.isLogin = true
        }
    }, 
    actions: {
        login() {

        }
    },
    modules: {

    }
})