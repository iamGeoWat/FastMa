const dbConn = require('./dbConn')
const queryString = require('./QueryString').user

module.exports = class UserDao {
  async add (username, password) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [username, password, 0, null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryUsername () {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryUsername)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryPasswordByUsername (username) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryPasswordByUsername, username)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryByUsername (username) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryByUsername, username)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryByUserId (userid) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryByUserId, userid)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryByCbId (cb_id) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryByCbId, cb_id)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modBalanceByUserId (bal, userid) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modBalanceByUserId, [bal, userid])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
}