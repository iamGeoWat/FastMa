const dbConn = require('./dbConn')
const queryString = require('./QueryString').betorder

module.exports = class BetOrderDao {
  async add (userid, stake_token, racetrack_id, iteration) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [userid, stake_token, racetrack_id, null, iteration, null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryOrderByUserId (userid) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryBetOrderByUserId, userid)
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
  async query () {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.query)
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