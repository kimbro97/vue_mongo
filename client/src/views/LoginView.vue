<template >
    <div>
        <LoginComponent />
    </div>
</template>
<script>
import LoginComponent from '../components/login/LoginComponent.vue'
export default {
    mounted() {
        this.getRefreshToken()
    },
    components: {
        LoginComponent
    },
    methods: {
        async getRefreshToken() {
            this.$store.dispatch('getRefreshToken')
        },
    }
}
</script>
<style>
    
</style>