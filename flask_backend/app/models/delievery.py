from app.models.base import db, Base
from app.models.user import User
from sqlalchemy import inspect, Column, Integer, String, SmallInteger, orm
from app.libs.error_code import NotFound, AuthFailed
class Delivery(User):
    __tablename__ = 'delivery'
    orders = db.relationship("Order", backref="delivery")

    @staticmethod
    def register_by_email(name, account, secret):
        print(name)
        with db.auto_commit():
            delivery = Delivery()
            delivery.name = name
            delivery.email = account
            delivery.password = secret

            db.session.add(delivery)

    def to_dict(self):
        """将订单信息转换为字典数据"""
        delivery_dict = {
            "id":self.id,
            "email": self.email,
            "name": self.name
        }
        return delivery_dict

    @staticmethod
    def verify(email, password):
        account = Delivery.query.filter_by(email=email).first()
        if not account:
            raise NotFound(msg='user not found')
        if not account.check_password(password):
            raise AuthFailed()
        return {'uid':account.id}

