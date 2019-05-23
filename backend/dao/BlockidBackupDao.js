const dbConn = require('./dbConn')
const queryString = require('./QueryString').blockid_backup

module.exports = class BlockidBackupDao {
  async add (blockid) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [blockid, null, null])
      return true
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