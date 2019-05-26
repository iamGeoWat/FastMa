<template>
  <div id="app">
    <div v-if="jwtToken === null">
      <LoginComponent @loginSuccess="handleLogin"></LoginComponent>
    </div>
    <div v-else>
      <GameStage v-if="jwtToken !== null" :jwt-token="jwtToken"></GameStage>
      <UserInfo v-if="jwtToken !== null" :jwt-token="jwtToken"></UserInfo>
      <Betting v-if="jwtToken !== null" :jwt-token="jwtToken"></Betting>
      <GameInfo v-if="jwtToken !== null" :jwt-token="jwtToken"></GameInfo>
      <div style="text-align: center">
        <el-button type="danger" style="width: 98%; margin-top: 10px; height: 50px" @click="logOut">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import GameStage from './components/GameStage.vue'
import Betting from './components/Betting.vue'
import LoginComponent from './components/LoginComponent.vue'
import UserInfo from './components/UserInfo.vue'
import GameInfo from './components/GameInfo'

export default {
  name: 'app',
  components: {
    GameStage,
    Betting,
    LoginComponent,
    UserInfo,
    GameInfo
  },
  data() {
    return {
      jwtToken: null
    }
  },
  mounted() {
    let storage = window.localStorage
    let zmkm = storage.getItem('zmkm')
    if (zmkm) {
      this.jwtToken = zmkm
    }
  },
  methods: {
    handleLogin(data) {
      let storage = window.localStorage
      storage.setItem('zmkm', data)
      this.jwtToken = data
    },
    logOut() {
      let storage = window.localStorage
      storage.removeItem('zmkm')
      this.jwtToken = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
