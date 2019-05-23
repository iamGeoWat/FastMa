const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Redis = require('ioredis')
const redis = new Redis()

const jwt = require('jsonwebtoken')
const jwtConfig = require('./config/jwtConfig')

const UserDao = require('./dao/UserDao')
const userDao = new UserDao()
const BetOrderDao = require('./dao/BetOrderDao')
const betOrderDao = new BetOrderDao()
// const RacetrackDao = require('./dao/RaceTrackDao')
// const racetrackDao = new RacetrackDao()
const GameDao = require('./dao/GameDao')
const gameDao = new GameDao()
const BlockidBackupDao = require('./dao/BlockidBackupDao')
const blockidBackupDao = new BlockidBackupDao()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json())

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
          racetracks.racetracks[parseInt(racetrack_id)].total_token = parseInt(racetracks.racetracks[parseInt(racetrack_id)].total_token) + parseInt(stake_token)
          racetracks.racetracks[parseInt(racetrack_id)].user_orders.push({ userid: userid, bet: stake_token})
          let racetracksToStore = JSON.stringify(racetracks)
          redis.set('racetracks', racetracksToStore)
          await betOrderDao.add(userid, stake_token, racetrack_id, racetracks.iteration)
          respMsg.status = 1
          respMsg.content = '下单成功'
          res.send(JSON.stringify(respMsg))
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

app.get('/racetracks', (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  let userid = tokenData.userid
  if (userid) {
    redis.get('racetracks').then((result) => {
      res.send(JSON.stringify(result))
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

app.listen(8803, () => console.log('game server is running on port 8803.'))