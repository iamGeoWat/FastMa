const EOS = require('eosjs')
const eosConfig = require('./config/eosConfig')
const { Api, JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const { TextDecoder, TextEncoder } = require('util')

const signatureProvider = new JsSignatureProvider([eosConfig.privateKey])
const rpc = new JsonRpc(eosConfig.endpoint, { fetch })
const eosJsApi = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

async function f() {
  let transferResult = await eosJsApi.transact({
    actions: [{
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: eosConfig.activeAccount,
        permission: 'active'
      }],
      data: {
        from: eosConfig.activeAccount,
        to: 'winterwinter',
        quantity: '0.1000 EOS',
        memo: 'hilla woda'
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30
  })
  console.log(transferResult)
}

f()

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