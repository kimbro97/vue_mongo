import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        email: ''
    },
    mutations: {
        setEmail(state, payload) {
            console.log(payload)
        }
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