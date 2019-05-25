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

const TopUpDap = require('./dao/TopUpDao')
const topUpDao = new TopUpDap()
const UserDao = require('./dao/UserDao')
const userDao = new UserDao()
const WithdrawDao = require('./dao/WithdrawDao')
const withdrawDao = new WithdrawDao()
const BetOrderDao = require('./dao/BetOrderDao')
const betOrderDao = new BetOrderDao()
const GameDao = require('./dao/GameDao')
const gameDao = new GameDao()
const BlockidBackupDao = require('./dao/BlockidBackupDao')
const blockidBackupDao = new BlockidBackupDao()

const Redis = require('ioredis')
const redis = new Redis()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // res.header("Access-Control-Allow-Methods", "GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS");
  next();
});
app.use(bodyParser.json())

// ---------- FUND SERVER -----------
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
    console.log(webhookData)
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
    
    let oldBalance = await userDao.queryByUserId(userid)
    oldBalance = oldBalance[0].balance
    // console.log(parseInt(amountToken))
    if (parseInt(oldBalance) >= amountToken && amountToken > 0) {
      let newBalance = oldBalance - amountToken
      await userDao.modBalanceByUserId(newBalance, userid)
      axios.get('https://api.bitfinex.com/v2/ticker/tEOSUSD').then(async (result) => {
        let eosPriceInUSD = result.data[0]
        let tokenInUSD = amountToken / 10
        let amountEOS = tokenInUSD / eosPriceInUSD
        await withdrawDao.add(userid, amountToken, amountEOS, eosAccount, eosMemo)
        respMsg.status = 1
        respMsg.result = 'create withdraw order successful'
        res.send(JSON.stringify(respMsg))
      })
    } else {
      respMsg.status = 0
      respMsg.result = 'insufficient token'
      res.send(JSON.stringify(respMsg))
    }
    //减去余额
    
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

// ------------GAME SERVER-------------
app.post('/order', async (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  let reqData = req.body
  let stake_token = reqData.stake_token
  let racetrack_id = reqData.racetrack_id
  let respMsg = { status: null, content: null }
  
  redis.get('isBetting').then(async (isBetting) => {
    if (isBetting === '0') {
      respMsg.status = 0
      respMsg.content = '未在下注时间'
      res.send(JSON.stringify(respMsg))
    } else {
      let oldBalance = await userDao.queryByUserId(userid)
      oldBalance = oldBalance[0].balance
      if (parseInt(oldBalance) >= stake_token && stake_token > 0) {
        let newBalance = oldBalance - stake_token
        await userDao.modBalanceByUserId(newBalance, userid) //todo: 验证返回值得到是否mod成功
        
        redis.get('racetracks').then(async (result) => {
          let racetracks = JSON.parse(result)
          racetracks[parseInt(racetrack_id)].total_token = parseInt(racetracks[parseInt(racetrack_id)].total_token) + parseInt(stake_token)
          racetracks[parseInt(racetrack_id)].user_orders.push({ userid: userid, bet: stake_token})
          let racetracksToStore = JSON.stringify(racetracks)
          redis.set('racetracks', racetracksToStore)
          redis.get('iteration').then(async (iteration)=>{
            await betOrderDao.add(userid, stake_token, racetrack_id, iteration)
            respMsg.status = 1
            respMsg.content = '下单成功'
            res.send(JSON.stringify(respMsg))
          })
        })
      } else {
        respMsg.status = 0
        respMsg.content = '余额不足'
        res.send(JSON.stringify(respMsg))
      }
    }
  })
  
})

app.get('/order', async (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  let orders = await betOrderDao.queryOrderByUserId(userid)
  res.send(JSON.stringify(orders))
})

app.get('/allorder', async (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  if (userid) {
    let orders = await betOrderDao.query()
    res.send(JSON.stringify(orders))
  } else {
    res.send('unauthorized')
  }
})

app.get('/status', (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  let userid = tokenData.userid
  if (userid) {
    // redis.get('racetracks').then((result) => {
    //   res.send(JSON.stringify(result))
    // })
    let racetracks = null
    let distances = null
    let isGaming = null
    let isBetting = null
    let track_win = null
    let iteration = null
    redis.get('racetracks').then((result1)=>{
      racetracks = JSON.parse(result1)
      redis.get('distances').then((result2)=>{
        distances = JSON.parse(result2)
        redis.get('isGaming').then((result3)=>{
          isGaming = JSON.parse(result3)
          redis.get('isBetting').then((result4)=>{
            isBetting = JSON.parse(result4)
            redis.get('track_win').then((result5)=>{
              track_win = JSON.parse(result5)
              redis.get('iteration').then((result6)=>{
                iteration = JSON.parse(result6)
                let respMsg = { racetracks: racetracks, distances: distances, isGaming: isGaming, isBetting: isBetting, track_win: track_win, iteration: iteration}
                res.send(JSON.stringify(respMsg))
              })
            })
          })
        })
      })
    })
  } else {
    res.send('unauthorized')
  }
})

app.get('/game', async (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  let userid = tokenData.userid
  if (userid) {
    let gameStatus = await gameDao.query()
    if (gameStatus) {
      res.send(JSON.stringify(gameStatus))
    } else {
      res.send('no record')
    }
  } else {
    res.send('unauthorized')
  }
})

app.get('/blockid_backup', async (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  let userid = tokenData.userid
  if (userid) {
    let blockids = await blockidBackupDao.query()
    if (blockids) {
      res.send(JSON.stringify(blockids))
    } else {
      res.send('no record')
    }
  } else {
    res.send('unauthorized')
  }
})

//------------USER SERVER----------------
app.post('/login', async (req, res) => {
  let passwordFail = { code: 1, content: 'wrong password' }
  let usernameFail = { code: 2, content: 'wrong username' }
  let unknownFail = { code: 3, content: 'unknown error' }
  let loginSuccess = { code: 0, content: 'login succeeded', token: null }
  let account = req.body
  try {
    let queryResult = await userDao.queryPasswordByUsername(account.username)
    if (queryResult.length === 0) {
      res.send(JSON.stringify(usernameFail))
    } else if (queryResult[0].password !== account.password ) {
      res.send(JSON.stringify(passwordFail))
    } else if (queryResult[0].password === account.password) {
      let userInfoResult = await userDao.queryByUsername(account.username)
      let userid = userInfoResult[0].userid
      loginSuccess.token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60*60*6),
        data: { username: account.username, userid: userid }
      }, jwtConfig.secret)
      res.send(JSON.stringify(loginSuccess))
    } else {
      res.send(JSON.stringify(unknownFail))
    }
  } catch (e) {
    res.send(JSON.stringify(unknownFail))
    throw e
    
  }
  
})

app.post('/register', async (req, res) => {
  let duplicateUsername = { code: 1, content: 'duplicate username' }
  let unknownError = { code: 2, content: 'unknown error' }
  let registerSuccess = { code: 0, content: 'register succeeded' }
  
  let account = req.body
  let queryUsernameResult = await userDao.queryByUsername(account.username)
  if (queryUsernameResult.length !== 0) {
    res.send(JSON.stringify(duplicateUsername))
  } else {
    try {
      let queryRegister = await userDao.add(account.username, account.password)
      res.send(JSON.stringify(registerSuccess))
    } catch (e) {
      res.send(JSON.stringify(unknownError))
      throw e
      
    }
  }
})

app.get('/userInfo', async (req, res) => {
  let jwtToken = req.get("Authorization")
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  let queryUserInfoResult = await userDao.queryByUserId(userid)
  res.send(JSON.stringify(queryUserInfoResult[0]))
})

app.listen(8801, () => console.log('api server is running on port 8801.'))