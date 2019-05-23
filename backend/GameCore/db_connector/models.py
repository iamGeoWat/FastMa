from db_connector import Base, DBSession
from sqlalchemy import Column, Integer, Time, String


# class BaseModel(Base):
#
#     def insert(self):
#         session = DBSession()
#         session.add(self)
#         session.commit()
#         session.close()


class RaceTrack(Base):
    __tablename__ = 'racetrack'
    racetrack_id = Column(Integer, primary_key=True, nullable=True)
    stake_token = Column(Integer, nullable=True)
    race_distance = Column(Integer, nullable=True)
    if_win = Column(Integer, nullable=True)
    iteration = Column(Integer, nullable=True)
    which_track = Column(Integer, nullable=True)

    def insert(self):
        session = DBSession()
        session.add(self)
        session.commit()
        session.close()


class BetOrder(Base):
    __tablename__ = "betorder"
    bet_orderid = Column(Integer, primary_key=True, nullable=False)
    userid = Column(Integer, nullable=False)
    stake_token = Column(Integer, nullable=False)
    racetrack_id = Column(Integer, nullable=False)
    time = Column(Time)
    iteration = Column(Integer, nullable=False)


class Game(Base):
    __tablename__ = 'game'
    iteration = Column(Integer, primary_key=True, nullable=True)
    total_volume = Column(Integer)
    user_count = Column(Integer)
    racetrack_row = Column(Integer, nullable=True)

    def __init__(self, it, track_row):
        self.iteration = it
        self.total_volume = 0
        self.user_count = 0
        self.racetrack_row = track_row

    def insert(self):
        session = DBSession()
        session.add(self)
        session.commit()
        session.close()


class BlockId(Base):
    __tablename__ = 'blockid_backup'
    blockid = Column(String(255), nullable=True)
    time = Column(Time, nullable=True)
    id = Column(Integer, primary_key=True, nullable=True)

    def __init__(self, bid, t):
        self.blockid = bid
        self.time = t

    def insert(self):
        session = DBSession()
        session.add(self)
        session.commit()
        session.close()


class User(Base):
    __tablename__ = 'user'
    username = Column(String(255), nullable=True)
    password = Column(String(255), nullable=True)
    balance = Column(Integer, nullable=True)
    userid = Column(Integer, primary_key=True, nullable=True)

    def __init__(self, uid):
        session = DBSession()
        q_user = session.query(User).filter_by(userid=uid).first()
        self.userid = uid
        self.balance = q_user.balance
        session.close()

    def add_bet(self, bet):
        session = DBSession()
        self.balance += bet
        session.merge(self)
        session.commit()
        session.close()

    def insert(self):
        session = DBSession()
        session.add(self)
        session.commit()
        session.close()
