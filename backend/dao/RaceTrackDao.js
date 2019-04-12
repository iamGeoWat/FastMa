const dbConn = require('./dbConn')
const queryString = require('./QueryString').racetrack

module.exports = class RaceTrackDao {
  async add (racetrack_id, iteration) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.add, [racetrack_id, 0, 0, 0, iteration])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryRacetrackByIteration (iteration) {
    let conn = await dbConn()
    try {
      let result = await conn.query(queryString.queryRacetrackByIteration, iteration)
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
  async modStatusByRacetrackId (racetrack_id, status) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modStatusByRacetrackId, [status, racetrack_id])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modRaceDistanceByRacetrackId (racetrack_id, race_distance) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modRaceDistanceByRacetrackId, [race_distance, racetrack_id])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async modStakeTokenByRacetrackId (racetrack_id, stake_token) {
    let conn = await dbConn()
    try {
      await conn.query(queryString.modStakeTokenByRacetrackId, [stake_token, racetrack_id])
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