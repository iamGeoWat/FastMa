<template>
    <el-card>
        <div class="info-text">
            <span>用户名：{{username}}</span>
            <span style="float: right">余额：{{balance}}</span>
            <div v-show="!showTopUp && !showTopUpHistory">
                <el-button type="primary" @click="toggleTopUp" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">充值</el-button>
                <el-button @click="toggleTopUpHistory" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">历史充值订单</el-button>
            </div>
            <div v-show="showTopUp">
                <el-input style="margin-top: 10px;" v-model="order_size" placeholder="Token数（100的倍数）"></el-input>
                <el-button @click="goTopUp" type="primary" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">去购买</el-button>
                <el-button style=" font-family: 'Noto Serif SC', serif;" @click="toggleTopUp">取消</el-button>
            </div>
            <div v-show="showTopUpHistory">
                <el-table :data="topUpHistoryData" style="width: 100%; margin-top: 10px">
                    <el-table-column prop="cb_id" label="充值ID"></el-table-column>
                    <el-table-column prop="order_size" label="充值数"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                </el-table>
                <el-button style="margin-top: 10px; font-family: 'Noto Serif SC', serif;" @click="toggleTopUpHistory">返回</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
    //https://commerce.coinbase.com/charges/R96477M2
  import axios from 'axios'
  export default {
    name: "UserInfo",
    props: {
      jwtToken: String
    },
    data() {
      return {
        balance: null,
        username: null,
        showTopUp: false,
        order_size: null,
        showTopUpHistory: false,
        topUpHistoryData: []
      }
    },
    methods: {
      toggleTopUpHistory() {
        this.showTopUpHistory = !this.showTopUpHistory
        // get top up history
        axios.get(this.fundServer + '/topup', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.status) {
            let orders = res.data.result
            this.topUpHistoryData = []
            for (let i = 0; i < orders.length; i++) {
              this.topUpHistoryData.push({ cb_id: orders[i].cb_id, order_size: orders[i].order_size, status: (parseInt(orders[i].if_done)===0)?'未完成':'已完成' })
            }
          } else {
            this.$notify({
              title: 'Server Error...',
              type: 'error',
              position: "bottom-right"
            })
          }
        })
      },
      toggleTopUp() {
        this.showTopUp = !this.showTopUp
      },
      goTopUp() {
        if (this.order_size !== null && this.order_size%100 === 0 && this.order_size !== 0) {
          axios.post(this.fundServer + '/topup', {
            order_size: this.order_size
          }, {
            headers: {
              'Authorization': this.jwtToken
            }
          }).then((res) => {
            if (res.data.status) {
              this.toggleTopUp()
              this.toggleTopUpHistory()
            } else {
              this.$notify({
                title: 'Server Error...',
                type: 'error',
                position: "bottom-right"
              })
            }
          })
        } else {
          this.$notify({
            title: "Token数量填写错误",
            type: 'error',
            position: "bottom-right"
          })
        }
      }
    },
    created() {
      axios.get(this.userServer + '/userInfo', {
        headers: {
          'Authorization': this.jwtToken
        }
      }).then((res) => {
        this.balance = res.data.balance
        this.username = res.data.username
      })
    }
  }
</script>

<style scoped>
    .info-text {
        font-family: 'Noto Serif SC', serif;
    }
</style>