const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const jwtConfig = require('./config/jwtConfig')

const EOS = require('eosjs')
const eosConfig = require('./config/eosConfig')
const { Api, JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const { TextDecoder, TextEncoder } = require('util')

const signatureProvider = new JsSignatureProvider([eosConfig.privateKey])
const rpc = new JsonRpc(eosConfig.endpoint, { fetch })
const eosJsApi = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json())

const TopUpDap = require('./dao/TopUpDao')
const topUpDao = new TopUpDap()
const UserDao = require('./dao/UserDao')
const userDao = new UserDao()
const WithdrawDao = require('./dao/WithdrawDao')
const withdrawDao = new WithdrawDao()

// 新建订单
app.post('/topup', (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  let orderSize = req.body.order_size
  let respMsg = { status: null, payUrl: null, cb_id: null, order_size: orderSize, userid: userid }
  // 1 dollar 10 token
  
  try {
    axios.post('https://api.commerce.coinbase.com/charges', {
      "name": "FastMa.io Deposit",
      "description": "Buying " + orderSize + " FSTM tokens.",
      "local_price": {
        "amount": orderSize / 10,
        "currency": "USD"
      },
      "pricing_type": "fixed_price",
      "metadata": {
        "customer_userid": userid
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': '98df43ad-33e6-464c-bd8e-0757ffbf381d',
        'X-CC-Version': '2018-03-22'
      }
    }).then(async (result) => {
      await topUpDao.add(result.data.data.code, orderSize, userid)
      respMsg.status = 1
      respMsg.payUrl = result.data.data.hosted_url
      respMsg.cb_id = result.data.data.code
      res.send(JSON.stringify(respMsg))
    })
  } catch (e) {
    respMsg.status = 0
    res.send(JSON.stringify(respMsg))
    throw e
  }
})

// 获取信息
app.get('/topup', async (req, res) => {
  let respMsg = { status: null, result: null }
  
  try {
    let jwtToken = req.get('Authorization')
    let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
    let tokenData = decodedToken.data
  
    let userid = tokenData.userid
    let queryOrderResult = await topUpDao.queryByUserId(userid)
    
    respMsg.status = 1
    respMsg.result = queryOrderResult
    
    res.send(JSON.stringify(respMsg))
  } catch (e) {
    respMsg.status = 0
    res.send(JSON.stringify(respMsg))
    throw e
  }
})

// 监听付款完成
app.post('/webhook', async (req, res) => {
  let respMsg = { status: null, result: null }
  try {
    let webhookData = req.body
    let topUpInfo = await topUpDao.queryByCbId(webhookData.event.data.code)
    topUpInfo = topUpInfo[0]
    let userInfo = await userDao.queryByUserId(topUpInfo.userid)
    userInfo = userInfo[0]
    userInfo.balance += topUpInfo.order_size
    await userDao.modBalanceByUserId(userInfo.balance, userInfo.userid)
    await topUpDao.modStatusByCbId(webhookData.event.data.code, 1)
  
    respMsg.status = 1
    respMsg.result = 'deposit succeeded'
    res.send(JSON.stringify(respMsg))
  } catch (e) {
    respMsg.status = 0
    respMsg.result = 'deposit error'
    res.send(JSON.stringify(respMsg))
    throw e
  }
})

// 新建提现请求
app.post('/withdraw', async (req, res) => {
  let respMsg = { status: null, result: null }
  try {
    let jwtToken = req.get('Authorization')
    let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
    let tokenData = decodedToken.data
    
    let userid = tokenData.userid
    let reqData = req.body
    let amountToken = reqData.amount_token
    let eosAccount = reqData.eos_account
    let eosMemo = reqData.eos_memo
    
    axios.get('https://api.bitfinex.com/v2/ticker/tEOSUSD').then(async (result) => {
  
      let oldBalance = await userDao.queryByUserId(userid)
      oldBalance = oldBalance[0].balance
      if (oldBalance >= amountToken) {
        let newBalance = oldBalance - amountToken
        await userDao.modBalanceByUserId(newBalance, userid)
      } else {
        respMsg.status = 0
        respMsg.result = 'insufficient token'
        res.send(JSON.stringify(respMsg))
      }
      //减去余额
      
      let eosPriceInUSD = result.data[0]
      let tokenInUSD = amountToken / 10
      let amountEOS = tokenInUSD / eosPriceInUSD
      await withdrawDao.add(userid, amountToken, amountEOS, eosAccount, eosMemo)
      respMsg.status = 1
      respMsg.result = 'create withdraw order successful'
      res.send(JSON.stringify(respMsg))
    })
  } catch (e) {
    respMsg.status = 0
    res.send(JSON.stringify(respMsg))
    throw e
  }
})
// 获取提现信息
app.get('/withdraw', async (req, res) => {
  let respMsg = { status: null, result: null }
  
  try {
    let jwtToken = req.get('Authorization')
    let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
    let tokenData = decodedToken.data
    
    let userid = tokenData.userid
    let queryWithdrawResult = await withdrawDao.queryByUserId(userid)
    
    respMsg.status = 1
    respMsg.result = queryWithdrawResult
    
    res.send(JSON.stringify(respMsg))
  } catch (e) {
    respMsg.status = 0
    res.send(JSON.stringify(respMsg))
    throw e
  }
})

// 验证并且执行提现
// let withdrawCd = 21600
let withdrawCd = eosConfig.withdrawInterval
let withdrawEngine = setInterval(async () => {
  withdrawCd -= 1
  // console.log(withdrawCd)
  if (withdrawCd === 0) {
    try {
      let withdrawOrders = await withdrawDao.queryByStatus(0)
      // console.log(withdrawOrders)
      for (let i = 0; i < withdrawOrders.length; i++) {
        let eosAmount = withdrawOrders[i].amount_eos.toFixed(4)
        // console.log(eosAmount)
        let eosMemo = withdrawOrders[i].eos_memo
        let eosAccount = withdrawOrders[i].eos_account
        let reqId = withdrawOrders[i].req_id
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
              to: eosAccount,
              quantity: eosAmount + ' EOS',
              memo: eosMemo
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
        // console.log(transferResult)
        await withdrawDao.modTxidByReqId(reqId, transferResult.transaction_id)
        await withdrawDao.modStatusByReqId(reqId, 1)
      }
      withdrawCd = eosConfig.withdrawInterval
    } catch (e) {
      throw e
    }
  }
}, 1000)

app.listen(8802, () => console.log('fund server is running on port 8802.'))