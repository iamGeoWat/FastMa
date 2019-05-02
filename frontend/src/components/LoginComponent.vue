<template>
    <div>
        <el-card class="form-card" v-if="!card_shown">
            <div style="text-align: center">
                <span style="font-size: 24px">请登录</span>
                <div style="margin-top: 10px;"><label style="width: 30%">账户名：</label><el-input v-model="username" style="width: 70%"></el-input></div>
                <div style="margin-top: 10px;"><label style="width: 30%">&nbsp;&nbsp;&nbsp;&nbsp;密码：</label><el-input v-model="password" style="width: 70%" show-password></el-input></div>
                <div>
                    <el-button @click="doLogin" type="primary" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">登录</el-button>
                    <el-button @click="switchCard" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">还没有账户，注册</el-button>
                </div>
            </div>
        </el-card>
        <el-card class="form-card" v-if="card_shown">
            <div style="text-align: center">
                <span style="font-size: 24px">请注册</span>
                <div style="margin-top: 10px;"><label style="width: 30%">账户名：</label><el-input v-model="username" style="width: 70%"></el-input></div>
                <div style="margin-top: 10px;"><label style="width: 30%">&nbsp;&nbsp;&nbsp;&nbsp;密码：</label><el-input v-model="password" style="width: 70%" show-password></el-input></div>
                <div style="margin-top: 10px;"><label style="width: 30%;">确认密码：</label><el-input v-model="confirm_password" style="width: 70%" show-password></el-input>&nbsp;&nbsp;&nbsp;</div>
                <div>
                    <el-button @click="doRegister" type="primary" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">注册</el-button>
                    <el-button @click="switchCard" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">已有账号，登录</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        card_shown: 0,
        username: null,
        password: null,
        confirm_password: null
      }
    },
    methods: {
      switchCard() {
        if (this.card_shown) {
          this.card_shown = 0
        } else {
          this.card_shown = 1
        }
      },
      doRegister() {
        if (this.username === null || this.password === null || this.confirm_password === null) {
          this.$notify({
            title: '未填写账户名/密码',
            type: 'error',
            position: "bottom-right"
          })
        } else if (this.password !== this.confirm_password) {
          this.$notify({
            title: '两次输入的密码不一致',
            type: 'error',
            position: "bottom-right"
          })
        } else {
          axios.post(this.userServer + '/register', {
            username: this.username,
            password: this.password
          }).then((res) => {
            if (res.data.code === 0) {
              this.$notify({
                title: '注册成功',
                type: 'success',
                position: "bottom-right",
                duration: 2000
              })
              this.card_shown = 0
            } else {
              this.$notify({
                title: res.data.content,
                type: 'error',
                position: "bottom-right"
              })
            }
          })
        }
      },
      doLogin() {
        if (this.username === null || this.password === null) {
          this.$notify({
            title: '未填写账户名/密码',
            type: 'error',
            position: "bottom-right"
          })
        } else {
          axios.post(this.userServer + '/login', {
            username: this.username,
            password: this.password
          }).then((res) => {
            if (res.data.code === 0) {
              // this.jwtToken = res.data.token
              this.$emit('loginSuccess',res.data.token)
              // console.log(this.jwtToken)
            } else {
              this.$notify({
                title: res.data.content,
                type: 'error'
              })
            }
          })
        }
      }
    },
    name: "LoginComponent"
  }
</script>

<style scoped>
    .form-card {
        font-family: 'Noto Serif SC', serif;
    }
</style>