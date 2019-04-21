const dbConn = require('./dbConn')
const queryString = require('./QueryString').withdraw

module.exports = class WithdrawDao {
  async add (userid, amount_token, amount_eos, eos_account, eos_memo) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [userid, amount_token, amount_eos, 0, eos_account, eos_memo, null, null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modStatusByReqId (req_id, status) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modStatusByReqId, [status, req_id])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modTxidByReqId (req_id, txid) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modTxidByReqId, [txid, req_id])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryByStatus (status) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryByStatus, status)
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
  async queryByReqId (req_id) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryByReqId, req_id)
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
}