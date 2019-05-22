const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const jwtConfig = require('./config/jwtConfig')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())

app.post('/order', (req, res) => {
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  
})















app.listen(8803, () => console.log('game server is running on port 8803.'))