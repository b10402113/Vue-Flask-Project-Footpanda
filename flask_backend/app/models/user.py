"""
 Created by 七月 on 2018/5/11.
"""
from sqlalchemy import inspect, Column, Integer, String, SmallInteger, orm
from werkzeug.security import generate_password_hash, check_password_hash

from app.libs.enums import ClientTypeEnum
from app.libs.error_code import NotFound, AuthFailed
from app.models.base import Base, db, MixinJSONSerializer

import datetime

__author__ = '七月'


class User(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True)
    email = Column(String(24), unique=True, nullable=False)
    name = Column(String(24), nullable=False)
    auth = Column(SmallInteger, default=1)
    _password = Column('password', String(100))



    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, raw):
        self._password = generate_password_hash(raw)

    # @staticmethod
    # def register_by_email(name, account, secret):
    #     with db.auto_commit():
    #         user = User()
    #         user.name = name
    #         user.email = account
    #         user.password = secret
    #         db.session.add(user)



    def check_password(self, raw):
        if not self._password:
            return False
        return check_password_hash(self._password, raw)

    def _set_fields(self):
        # self._exclude = ['_password']
        self._fields = ['_password', 'name']
