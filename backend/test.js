// const EOS = require('eosjs')
// const eosConfig = require('./config/eosConfig')
// const { Api, JsonRpc } = require('eosjs')
// const fetch = require('node-fetch')
// const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
// const { TextDecoder, TextEncoder } = require('util')
//
// const signatureProvider = new JsSignatureProvider([eosConfig.privateKey])
// const rpc = new JsonRpc(eosConfig.endpoint, { fetch })
// const eosJsApi = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
//
// async function f() {
//   let transferResult = await eosJsApi.transact({
//     actions: [{
//       account: 'eosio.token',
//       name: 'transfer',
//       authorization: [{
//         actor: eosConfig.activeAccount,
//         permission: 'active'
//       }],
//       data: {
//         from: eosConfig.activeAccount,
//         to: 'winterwinter',
//         quantity: '0.1000 EOS',
//         memo: 'hilla woda'
//       }
//     }]
//   }, {
//     blocksBehind: 3,
//     expireSeconds: 30
//   })
//   console.log(transferResult)
// }
//
// f()

// (async () => {
//   const result = await api.transact({
//     actions: [{
//       account: 'eosio.token',
//       name: 'transfer',
//       authorization: [{
//         actor: 'useraaaaaaaa',
//         permission: 'active',
//       }],
//       data: {
//         from: 'useraaaaaaaa',
//         to: 'useraaaaaaab',
//         quantity: '0.0001 SYS',
//         memo: '',
//       },
//     }]
//   }, {
//     blocksBehind: 3,
//     expireSeconds: 30,
//   });
//   console.dir(result);
// })();

// const express = require('express')
// const app = express()
// const WebSocket = require('ws')
// const { EoswsClient, createEoswsSocket, InboundMessageType } = require('@dfuse/eosws-js')
// const axios = require('axios')
//
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// class GameEngine {
//   constructor () {
//     this.wsApiKey = 'server_9bbaf4df9fc8f45287736a6e0587a804'
//     this.wsEndpoint = 'mainnet.eos.dfuse.io'
//     this.wsToken = null
//     this.wsClient = null
//   }
//
//   async createWsClient () {
//     var that = this
//     await axios.post('https://auth.dfuse.io/v1/auth/issue', {
//       "api_key": that.wsApiKey
//     }).then((res) => {
//       that.wsToken = res.data.token
//       console.log(res.data)
//       that.wsClient = new EoswsClient(
//         createEoswsSocket(() => new WebSocket(`wss://${that.wsEndpoint}/v1/stream?token=${that.wsToken}`))
//       )
//     })
//   }
//
//   getBlockId() {
//     var that = this
//     that.wsClient.connect().then(() => {
//       that.wsClient
//         .getActionTraces({ account: "eosio", action_name: "onblock" })
//         .onMessage((message) => {
//           if (message.type === InboundMessageType.ACTION_TRACE) {
//             // const { from, to, quantity, memo } = message.data.trace.act.data
//             console.log(message.data.block_id)
//             // console.log(from, to, quantity, memo)/
//           }
//         })
//       // that.wsClient
//       //   .getTableRows({ code: "eosio", scope: "eosio", table: "global", json: true })
//       //   .onMessage((message) => {
//       //     if (message.type === InboundMessageType.TABLE_DELTA) {
//       //       // console.log(message.data)
//       //       console.log(message.data.dbop)
//       //       // const { from, to, quantity, memo } = message.data.trace.act.data
//       //     }
//       //   })
//     })
//       .catch((error) => {
//         console.log("Unable to connect to dfuse endpoint.", error)
//       })
//   }
//
//   async start() {
//     await this.createWsClient()
//
//     this.getBlockId()
//   }
//
// }
//
// function serverStart() {
//   let ge = new GameEngine()
//   ge.start()
// }
//
// serverStart()

const axios = require('axios')

axios.get('https://mainnet.eos.dfuse.io/v0/block_id/by_time?time=2019-03-04T10:36:14.5Z&comparator=gte', {
  headers: {
    "Authorization": 'Bearer eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc1MDAxNjgsImp0aSI6IjUwNjZmYjAyLWI4YWYtNDFkNS1hZTVkLTllMzNjY2Q1YjM0YiIsImlhdCI6MTU1NzQxMzc2OCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiJ1aWQ6MHp1cmFlMzhlYTZkOThlYzE4YzFkIiwiYWtpIjoiOTU3MzMxZjY0MDcyYTg3YjhkZTQxMjJmZTc0NTRlMTAzZjBmMTNiZDdlMTgyYTkxZjEwNWIyYzdjZTk1MzVhNCIsInRpZXIiOiJmcmVlLXYxIiwic3RibGsiOi0zNjAwLCJ2IjoxfQ.E3IheLwXEROoN1in3w_Cv7AWGO-zluqPH9qqulE6tKJwTBxix29lmgCMKxIBtycvpM1m6oUI4W4Olsf-Prirew'
  }
}).then((res) =>{
  console.log(res.data)
})