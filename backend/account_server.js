const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const UserDao = require('./dao/UserDao')
const userDao = new UserDao()

app.post('/login', async (req, res) => {
  let passwordFail = {code: 1, content: 'wrong password'};
  let usernameFail = { code: 2, content: 'wrong username' }
  let unknownFail = { code: 3, content: 'unknown error' }
  let loginSuccess = { code: 0, content: 'login succeeded', userid: null }
  
  let account = req.body
  let queryResult = await userDao.queryPasswordByUsername(account.password)
  if (queryResult.length === 0) {
    res.send(JSON.stringify(usernameFail))
  } else if () 
})