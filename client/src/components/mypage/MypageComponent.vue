<template>
    <div class="mypage">
        <div v-show="isEdit === false">
            <div>
                <span>{{`nickname: ${nickname}`}}</span>
            </div>
            <div>
                <span>{{ `email: ${email}` }}</span>
            </div>
            <v-btn @click="editUserInfo">
                수정
            </v-btn>
            <v-btn @click="logout">
                로그아웃
            </v-btn>
        </div>
        <div v-show="isEdit === true">
            <div>
                <div>닉네임</div>
                <input type="text" v-model="nickname">
            </div>
            <div>
                <div>비밀번호</div>
                <input type="password" v-model="password">
            </div>
            <v-btn @click="editInfo">
                수정
            </v-btn>
            <v-btn @click="signout">
                회원탈퇴
            </v-btn>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isEdit: false,
            nickname: '',
            email: '',
            password: ''
        }
    },
    async mounted() {
        const userInfo = await this.$store.dispatch('getUserInfo')
        this.email = userInfo.email
        this.nickname = userInfo.nickname
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
        },

        editUserInfo() {
            this.isEdit = true
        },
        async signout() {
            await this.$store.dispatch('signout')
        },
        async editInfo() {
            await this.$store.dispatch('editInfo', {nickname: this.nickname, password: this.password})
            this.isEdit = false
        }
    }
}
</script>
<style>
.mypage {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}    
input {
    border: 1px solid;
    background-color: aliceblue;
}
</style>