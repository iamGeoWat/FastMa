const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const jwtConfig = require('./config/jwtConfig')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())

const TopUpDap = require('./dao/TopUpDao')
const topUpDao = new TopUpDap()
const UserDao = require('./dao/UserDao')
const userDao = new UserDao()

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
      await topUpDao.add(result.data.code, orderSize, userid)
      respMsg.status = 1
      respMsg.payUrl = result.data.hosted_url
      respMsg.cb_id = result.data.code
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
// 验证并且执行提现

app.listen(8802, () => console.log('fund server is running on port 8802.'))