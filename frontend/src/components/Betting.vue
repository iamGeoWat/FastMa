<template>
    <el-card style="margin-top: 10px">
        <el-input autocapitalize="off" autocorrect="off" style="margin-top: 10px" v-model="stake_token" placeholder="下注金额（整数）" type="number"></el-input>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-select v-model="selectedTrack" placeholder="请选择赛道" style="margin-top: 10px">
                    <el-option v-for='item in tracks' :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" style="margin-top: 10px; width: 100%;" @click="doBet">投注</el-button>
            </el-col>
        </el-row>
        <el-table :data="betHistoryData" height="150" style="width: 100%; margin-top: 10px">
            <el-table-column prop="stake_token" label="下注金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="racetrack_id" label="赛道"></el-table-column>
            <el-table-column prop="userid" label="用户ID"></el-table-column>
            <el-table-column prop="time" label="时间" show-overflow-tooltip></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
  import axios from 'axios'
  //todo: https 调试webhook
  export default {
    name: "BettingOption",
    props: {
      jwtToken: String
    },
    mounted() {
      this.loadAllBetHistory()
      setInterval(()=>{
        this.loadAllBetHistory()
      }, 5000)
    },
    methods: {
      doBet() {
        if (this.selectedTrack !== null && this.stake_token !== null) {
          axios.post(this.apiServer + '/order', {
            stake_token: this.stake_token,
            racetrack_id: this.selectedTrack
          }, {
            headers: {
              'Authorization': this.jwtToken
            }
          }).then((res)=>{
            if (res.data.status) {
              this.stake_token = null
              this.selectedTrack = null
              this.$notify({
                title: "投注成功",
                type: 'success',
                position: "bottom-right"
              })
              this.eventBus.$emit('updateUserInfo')
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
      loadAllBetHistory() {
        axios.get(this.apiServer + '/allorder', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res) => {
          let bets = res.data
          this.betHistoryData = []
          for (let i = 0; i < bets.length; i++) {
            this.betHistoryData.push({ stake_token: bets[i].stake_token, racetrack_id: bets[i].racetrack_id, time: bets[i].time, userid: bets[i].userid})
          }
        })
      }
    },
    data() {
      return {
        betHistoryData: [],
        stake_token: null,
        selectedTrack: null,
        tracks: [{
          value: 0,
          label: '1'
        }, {
          value: 1,
          label: '2'
        }, {
          value: 2,
          label: '3'
        }, {
          value: 3,
          label: '4'
        }, {
          value: 4,
          label: '5'
        }, {
          value: 5,
          label: '6'
        }, {
          value: 6,
          label: '7'
        }, {
          value: 7,
          label: '8'
        }]
      }
    }
  }
</script>

<style scoped>

</style>