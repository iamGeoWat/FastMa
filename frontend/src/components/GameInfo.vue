<template>
    <el-card style="margin-top: 10px; font-family: 'Noto Serif SC', serif;">
        <div slot="header">
            游戏状态信息
        </div>
        <el-card>
            <div slot="header">赛马信息:</div>
            <el-table :data="racetracks" height="150" style="width: 100%; margin-top: 10px">
                <el-table-column prop="total_token" label="总下注量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="distance" label="跑出距离" show-overflow-tooltip></el-table-column>
            </el-table>
        </el-card>
        <el-card style="margin-top: 10px">
            <div slot="header">选用的BlockID:</div>
            <el-table :data="block_ids" height="150" style="width: 100%; margin-top: 10px">
                <el-table-column prop="blockid" label="BlockID" show-overflow-tooltip></el-table-column>
                <el-table-column prop="time" label="Time" show-overflow-tooltip></el-table-column>
            </el-table>
        </el-card>
        <el-card style="margin-top: 10px">
            <div slot="header">游戏状态:</div>
            <div>
                <div>开始状态：{{game_status.isGaming?'比赛开始':'比赛未开始'}}</div>
                <div>下注状态：{{game_status.isBetting?'可以下注':'下注停止'}}</div>
                <div>结算状态：{{!game_status.isGaming&&!game_status.isBetting?'结算冷却':'未在结算'}}</div>
            </div>
        </el-card>
    </el-card>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "GameInfo",
    props: {
      jwtToken: String
    },
    mounted() {
      this.loadInfo()
      this.loadBlockId()
      setInterval(()=>{
        this.loadInfo()
        this.loadBlockId()
      }, 10000)
    },
    methods: {
      loadInfo() {
        axios.get(this.apiServer + '/status', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res)=>{
          // console.log(res.data)
          let info = JSON.parse(JSON.stringify(res.data))
          this.game_status.isGaming = parseInt(info.isGaming)
          this.game_status.isBetting = parseInt(info.isBetting)
          this.racetracks = []
          for (let i = 0; i < info.racetracks.length; i++) {
            this.racetracks.push({total_token: info.racetracks[i].total_token, distance: info.distances[i]})
          }
        })
      },
      loadBlockId() {
        axios.get(this.apiServer + '/blockid_backup', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res)=>{
          this.block_ids = res.data
        })
      }
    },
    data () {
      return {
        block_ids: [],
        game_status: {},
        racetracks: []
      }
    }
  }
</script>

<style scoped>

</style>