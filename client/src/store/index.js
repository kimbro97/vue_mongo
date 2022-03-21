import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        
    },
    mutations: {

    },
    actions: {
        async userLogin() {
            await axios.post('http://localhost:3000/login', {
                email,
                password
            })
        }
    }
})