<template>
  <div id="app">
    <div v-if="jwtToken === null">
      <LoginComponent @loginSuccess="handleLogin"></LoginComponent>
    </div>
    <div v-else>
      <GameStage></GameStage>
      <UserInfo v-if="jwtToken !== null" :jwt-token="jwtToken"></UserInfo>
      <BettingOption></BettingOption>
    </div>
  </div>
</template>

<script>
import GameStage from './components/GameStage.vue'
import BettingOption from './components/BettingOption.vue'
import LoginComponent from './components/LoginComponent.vue'
import UserInfo from './components/UserInfo.vue'

export default {
  name: 'app',
  components: {
    GameStage,
    BettingOption,
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
