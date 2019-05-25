const dbConn = require('./dbConn')
const queryString = require('./QueryString').topup

module.exports = class TopUpDao {
  async add (cb_id, order_size, userid) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [cb_id, order_size, 0, userid, null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryByOrderId (orderid) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryByOrderId, orderid)
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
  async modStatusByCbId (cb_id, status) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modStatusByCbId, [status, cb_id])
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