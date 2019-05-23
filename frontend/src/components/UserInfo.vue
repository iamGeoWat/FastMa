<template>
    <el-card>
        <div class="info-text">
            <span>用户名：{{username}}</span>
            <span style="float: right">余额：{{balance}}</span>
            <div v-show="!showTopUp && !showTopUpHistory && !showWithdraw && !showWithdrawHistory">
                <el-button type="primary" @click="toggleTopUp" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">充值</el-button>
                <el-button @click="toggleTopUpHistory" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">充值历史</el-button>
                <br>
                <el-button @click="toggleWithdraw" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">提现</el-button>
                <el-button style="margin-top: 10px; font-family: 'Noto Serif SC', serif;" @click="toggleWithdrawHistory">提现历史</el-button>
            </div>
            <div v-show="showTopUp">
                <el-input autocapitalize="off" autocorrect="off" style="margin-top: 10px;" v-model="order_size" placeholder="Token数（100的倍数）" type="number"></el-input>
                <el-button @click="goTopUp" type="primary" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">去购买</el-button>
                <el-button style=" font-family: 'Noto Serif SC', serif;" @click="toggleTopUp">取消</el-button>
            </div>
            <div v-show="showTopUpHistory">
                <el-table :data="topUpHistoryData" height="150" style="width: 100%; margin-top: 10px">
                    <el-table-column prop="cb_id" label="充值ID"></el-table-column>
                    <el-table-column prop="order_size" label="充值数"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-button :disabled="scope.row.status!==0" size="medium" :type="scope.row.status===0?'primary':'default'" @click="goCoinbasePage(scope.row.cb_id)">
                                {{scope.row.status === 0 ? '去转账' : '已完成'}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button style="margin-top: 10px; font-family: 'Noto Serif SC', serif;" @click="toggleTopUpHistory">返回</el-button>
            </div>
            <div v-show="showWithdraw">
                <el-input autocapitalize="off" autocorrect="off" style="margin-top: 10px" v-model="eos_account" placeholder="EOS 账户名"></el-input>
                <el-input autocapitalize="off" autocorrect="off" style="margin-top: 10px" v-model="eos_memo" placeholder="Memo (提现到交易所必须填写充值Memo)"></el-input>
                <el-input autocapitalize="off" autocorrect="off" style="margin-top: 10px" v-model="withdraw_amount" placeholder="提现的 Token 数（100的倍数）" type="number"></el-input>
                <el-button type="primary" style="margin-top: 10px; font-family: 'Noto Serif SC', serif;" @click="goWithdraw">提现</el-button>
                <el-button style="margin-top: 10px; font-family: 'Noto Serif SC', serif;" @click="toggleWithdraw">返回</el-button>
            </div>
            <div v-show="showWithdrawHistory">
                <el-table :data="withdrawHistoryData" height="150" style="width: 100%; margin-top: 10px">
                    <el-table-column prop="amount_eos" label="EOS" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="amount_token" label="Token"></el-table-column>
                    <el-table-column prop="eos_account" label="EOS账户" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="eos_memo" label="Memo"></el-table-column>
                    <el-table-column prop="if_done" label="状态"></el-table-column>
                    <el-table-column prop="txid" label="txid" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-button style="margin-top: 10px; font-family: 'Noto Serif SC', serif;" @click="toggleWithdrawHistory">返回</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "UserInfo",
    props: {
      jwtToken: String
    },
    data() {
      return {
        showWithdrawHistory: false,
        eos_account: null,
        eos_memo: null,
        withdraw_amount: null,
        balance: null,
        username: null,
        showTopUp: false,
        order_size: null,
        showTopUpHistory: false,
        topUpHistoryData: [],
        showWithdraw: false,
        withdrawHistoryData: []
      }
    },
    mounted() {
      this.eventBus.$on('updateUserInfo', () => {
        this.getUserInfo()
      })
    },
    methods: {
      toggleWithdrawHistory() {
        this.showWithdrawHistory = !this.showWithdrawHistory
        axios.get(this.fundServer + '/withdraw', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res) => {
          if (res.data.status) {
            let orders = res.data.result
            this.withdrawHistoryData = []
            for (let i = 0; i < orders.length; i++) {
              this.withdrawHistoryData.push({ amount_eos: orders[i].amount_eos, amount_token: orders[i].amount_token, eos_account: orders[i].eos_account, eos_memo: orders[i].eos_memo, if_done: parseInt(orders[i].if_done)===0?'等待处理':'已转账', txid: orders[i].txid })
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
      goWithdraw() {
        if (this.withdraw_amount !== null && this.withdraw_amount%100 === 0 && this.withdraw_amount !== 0 && this.eos_account !== null) {
          axios.post(this.fundServer + '/withdraw', {
            eos_memo: this.eos_memo?this.eos_memo:' ',
            eos_account: this.eos_account,
            amount_token: this.withdraw_amount
          }, {
            headers: {
              'Authorization': this.jwtToken
            }
          }).then((res) => {
            if (res.data.status) {
              this.eos_account = null
              this.eos_memo = null
              this.withdraw_amount = null
              this.$notify({
                title: "提现成功，请等待程序自动结算",
                type: 'success',
                position: "bottom-right"
              })
              this.getUserInfo()
              this.showWithdraw = false
            } else {
              this.$notify({
                title: res.data.result,
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
      },
      toggleWithdraw() {
        this.showWithdraw = !this.showWithdraw
      },
      toggleTopUpHistory() {
        this.showTopUpHistory = !this.showTopUpHistory
        axios.get(this.fundServer + '/topup', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res) => {
          if (res.data.status) {
            let orders = res.data.result
            this.topUpHistoryData = []
            for (let i = 0; i < orders.length; i++) {
              this.topUpHistoryData.push({ cb_id: orders[i].cb_id, order_size: orders[i].order_size, status: parseInt(orders[i].if_done) })
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
      goCoinbasePage(cb_id) {
        window.open("https://commerce.coinbase.com/charges/" + cb_id)
        // todo: 添加付款过期 （webhook以及前端判断）
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
      },
      getUserInfo() {
        axios.get(this.userServer + '/userInfo', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res) => {
          this.balance = res.data.balance
          this.username = res.data.username
        })
      }
    },
    created() {
      this.getUserInfo()
    }
  }
</script>

<style scoped>
    .info-text {
        font-family: 'Noto Serif SC', serif;
    }
</style>