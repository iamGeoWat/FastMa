const dbConn = require('./dbConn')
const queryString = require('./QueryString').game

module.exports = class GameDao {
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
  async modIteration (iteration) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modIteration, iteration)
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modTotalVolume (total_volume) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modTotalVolume, total_volume)
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modUserCount (user_count) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modUserCount, user_count)
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  // async modBettingStatus (status) {
  //   let conn = await dbConn()
  //   try {
  //     await conn.query(queryString.modBettingStatus, status)
  //     return true
  //   } catch (e) {
  //     console.log(e)
  //     throw e
  //   } finally {
  //     await conn.release()
  //     await conn.destroy()
  //   }
  // }
  async modRacetrackRow (row) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modRacetrackRow, row)
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