const UserDao = require('./UserDao')
const userDao = new UserDao()

var i = 'a'

async function a() {
  i = await userDao.queryByUsername('alkjnf')
  console.log(i.length === 0)
}

a()
// console.log(i)