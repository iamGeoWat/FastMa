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

app.post('/topup', (req, res) => {
  //coinbase id / orderid / if_done
  //order size / userid
  let jwtToken = req.get('Authorization')
  let decodedToken = jwt.verify(jwtToken, jwtConfig.secret)
  let tokenData = decodedToken.data
  
  let userid = tokenData.userid
  let orderSize = req.body.order_size
  // 1 dollar 10 token
  
  
})

app.listen(8802, () => console.log('fund server is running on port 8802.'))