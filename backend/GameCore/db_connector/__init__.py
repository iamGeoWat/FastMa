from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from util import read_config

p = read_config().properties

connection_data = "mysql+pymysql://{}:{}@{}:{}/{}".format(p['db.username'],
                                                          p['db.password'],
                                                          p['db.hostname'],
                                                          p['db.port'],
                                                          p['db.database_name'])

conn = create_engine(connection_data, encoding="utf-8", echo=True)

DBSession = sessionmaker(bind=conn)

Base = declarative_base()
