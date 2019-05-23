<template>
  <div id="app">
    <div v-if="jwtToken === null">
      <LoginComponent @loginSuccess="handleLogin"></LoginComponent>
    </div>
    <div v-else>
      <GameStage></GameStage>
      <UserInfo v-if="jwtToken !== null" :jwt-token="jwtToken" @update-user-info="getUserInfo"></UserInfo>
      <Betting v-if="jwtToken !== null" :jwt-token="jwtToken"></Betting>
    </div>
<!--    <Betting></Betting>-->

  </div>
</template>

<script>
import GameStage from './components/GameStage.vue'
import Betting from './components/Betting.vue'
import LoginComponent from './components/LoginComponent.vue'
import UserInfo from './components/UserInfo.vue'

export default {
  name: 'app',
  components: {
    GameStage,
    Betting,
    LoginComponent,
    UserInfo
  },
  data() {
    return {
      jwtToken: null
    }
  },
  methods: {
    handleLogin(data) {
      this.jwtToken = data
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
