const express = require('express')
const app = express()
const WebSocket = require('ws')
const { EoswsClient, createEoswsSocket, InboundMessageType } = require('@dfuse/eosws-js')
const axios = require('axios')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

class GameEngine {
  constructor () {
    this.wsApiKey = 'server_9bbaf4df9fc8f45287736a6e0587a804'
    this.wsEndpoint = 'mainnet.eos.dfuse.io'
    this.wsToken = null
    this.wsClient = null
  }
  
  async createWsClient () {
    var that = this
    await axios.post('https://auth.dfuse.io/v1/auth/issue', {
      "api_key": that.wsApiKey
    }).then((res) => {
      that.wsToken = res.data.token
      console.log(res.data)
      that.wsClient = new EoswsClient(
        createEoswsSocket(() => new WebSocket(`wss://${that.wsEndpoint}/v1/stream?token=${that.wsToken}`))
      )
    })
  }
  
  getBlockId() {
    var that = this
    that.wsClient.connect().then(() => {
      that.wsClient
        .getActionTraces({ account: "eosio", action_name: "onblock" })
        .onMessage((message) => {
          if (message.type === InboundMessageType.ACTION_TRACE) {
            // const { from, to, quantity, memo } = message.data.trace.act.data
            console.log(message.data.block_id)
            // console.log(from, to, quantity, memo)/
          }
        })
      // that.wsClient
      //   .getTableRows({ code: "eosio", scope: "eosio", table: "global", json: true })
      //   .onMessage((message) => {
      //     if (message.type === InboundMessageType.TABLE_DELTA) {
      //       // console.log(message.data)
      //       console.log(message.data.dbop)
      //       // const { from, to, quantity, memo } = message.data.trace.act.data
      //     }
      //   })
    })
      .catch((error) => {
        console.log("Unable to connect to dfuse endpoint.", error)
      })
  }
 
  async start() {
    await this.createWsClient()

    this.getBlockId()
  }

}

function serverStart() {
  let ge = new GameEngine()
  ge.start()
}

serverStart()