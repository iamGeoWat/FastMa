const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const jwtConfig = require('./config/jwtConfig')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json())

const UserDao = require('./dao/UserDao')
const userDao = new UserDao()

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

app.listen(8801, () => console.log('user server is running on port 8801.'))