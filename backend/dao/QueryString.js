module.exports = {
  user: {
    add: 'INSERT INTO user VALUES ( ?, ?, ?, ? )',
    queryUsername: 'SELECT username FROM user',
    queryPasswordByUsername: 'SELECT password FROM user WHERE username = ?',
    queryByUsername: 'SELECT * FROM user WHERE username = ?',
    queryByUserId: 'SELECT * FROM user WHERE userid = ?',
    modBalanceByUserId: 'UPDATE user SET balance = ? WHERE userid = ?'
  },
  withdraw: {
    add: 'INSERT INTO withdraw VALUES ( ?, ?, ?, ?, ?, ?, ?)',
    modStatusByReqId: 'UPDATE withdraw SET if_done = ? WHERE req_id = ?',
    queryByStatus: 'SELECT * FROM withdraw WHERE if_done = ?',
    queryByReqId: 'SELECT * FROM withdraw WHERE req_id = ?',
    queryByUserId: 'SELECT * FROM withdraw WHERE userid = ?'
  },
  blockid_backup: {
    add: 'INSERT INTO blockid_backup VALUES ( ?, ?, ?, ?)',
    query: 'SELECT * FROM blockid_backup'
  },
  topup: {
    add: 'INSERT INTO topup VALUES (?, ?, ?, ?, ?)',
    queryByOrderId: 'SELECT * FROM topup WHERE orderid = ?',
    queryByUserId: 'SELECT * FROM topup WHERE userid = ?',
    queryByCbId: 'SELECT * FROM topup WHERE cb_id = ?',
    modStatusByCbId: 'UPDATE topup SET if_done = ? WHERE cb_id = ?'
  },
  racetrack: {
    add: 'INSERT INTO racetrack VALUES ( ?, ?, ?, ?, ?)',
    queryRacetrackByIteration: 'SELECT * FROM racetrack WHERE iteration = ?',
    modStatusByRacetrackId: 'UPDATE racetrack SET if_win = ? WHERE racetrack_id = ?',
    modRaceDistanceByRacetrackId: 'UPDATE racetrack SET race_distance = ? WHERE racetrack_id = ?',
    modStakeTokenByRacetrackId: 'UPDATE racetrack SET stake_token = ? WHERE racetrack_id = ?'
  },
  game: {
    query: 'SELECT * FROM game',
    modIteration: 'UPDATE game SET iteration = ?',
    modTotalVolume: 'UPDATE game SET total_volume = ?',
    modUserCount: 'UPDATE game SET user_count = ?',
    modBettingStatus: 'UPDATE game SET is_betting = ?'
  },
  betorder: {
    add: 'INSERT INTO betorder VALUES (?, ?, ?, ?, ?, ?)',
    queryBetOrderByUserId: 'SELECT * FROM betorder WHERE userid = ?',
    query: 'SELECT * FROM betorder'
  }
}