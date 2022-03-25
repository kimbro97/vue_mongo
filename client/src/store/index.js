import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false, // 로그인이 되어 있는지 확인하는 상태
        userInfo: null
    },
    mutations: { // 스테이트 값을 변경하는 녀석
        setIsLogin(state) {
            return state.isLogin = true
        },
        setUserInfo(state, payload) {
            return state.userInfo = { ...payload }
        }
    }, 
    actions: {
        async getRefreshToken() {
            const refreshToken = localStorage.getItem('refreshToken')
            const result = await axios.get('http://localhost:3000/api/v1/auth/refreshtoken',{
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }    
            })
            if (result.data.success) {
              localStorage.setItem('accessToken', result.data.accessToken)
              localStorage.setItem('refreshToken', result.data.refreshToken)
              await router.push('mypage')
            }
        },
        async login(state, payload) {
            const { email, password} = payload
            const result = await axios.post('http://localhost:3000/api/v1/users/login', 
            { email, password }
            )
            if (result.data.success) {
              localStorage.setItem('accessToken', result.data.accessToken)
              localStorage.setItem('refreshToken', result.data.refreshToken)
              await router.push('mypage')
            }
        },
        async signup(state, payload) {
            const { email, password, nickname } = payload
            const result = await axios.post('http://localhost:3000/api/v1/users/signup', 
            { email, password, nickname }
            )
            if (result.data.success) {
                await alert('회원가입 성공')
                await router.push('/')
            }
        },
        async getUserInfo() {
            const accessToken = localStorage.getItem('accessToken')

            const result = await axios.get('http://localhost:3000/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (result.data.success) {
                return result.data.userInfo
            }
        },

        async logout() {
            const accessToken = localStorage.getItem('accessToken')

            const result = await axios.post('http://localhost:3000/api/v1/users/logout', null ,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (result.data.success) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                await router.push('/')
            }
        },
        async signout() {
            alert('회원탈퇴 하실건가요?')
            const accessToken = localStorage.getItem('accessToken')

            const result = await axios.delete('http://localhost:3000/api/v1/users' ,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (result.data.success) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                alert(result.data.message)
                await router.push('/')
            }
        },
        async editInfo(state, payload) {

            const { password, nickname } = payload

            const accessToken = localStorage.getItem('accessToken')

            const result = await axios.put('http://localhost:3000/api/v1/users' , 
            { 
                password,
                nickname
            } ,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (result.data.success) {
                console.log(result.data)
                localStorage.setItem('accessToken', result.data.accessToken)
                localStorage.setItem('refreshToken', result.data.refreshToken)
                alert('유저정보가 변경 되었습니다')
            }
        }
    },
    modules: {

    }
})