const dbConn = require('./dbConn')
const queryString = require('./QueryString').txid_backup

module.exports = class TxidBackupDao {
  async add (txid) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [txid, null, null])
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