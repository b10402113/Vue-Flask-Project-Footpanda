from app.libs.error_code import NotFound, AuthFailed
from app.models.base import db, Base
from app.models.user import User
from sqlalchemy import inspect, Column, Integer, String, SmallInteger, orm

class Customer(User):
    __tablename__ = 'customer'
    orders = db.relationship("Order", backref="customer")

    # 指名要序列化的屬性
    def keys(self):
        return ['id', 'email', 'name', 'auth']

    def to_dict(self):
        """将订单信息转换为字典数据"""
        cus_dict = {
            "id":self.id,
            "email": self.email,
            "name": self.name
        }
        return cus_dict

    @staticmethod
    def register_by_email(name, account, secret):
        with db.auto_commit():
            customer = Customer()
            customer.name = name
            customer.email = account
            customer.password = secret

            db.session.add(customer)



    @staticmethod
    def verify(email, password):
        account = Customer.query.filter_by(email=email).first()
        if not account:
            raise NotFound(msg='user not found')
        if not account.check_password(password):
            raise AuthFailed()
        return {'uid':account.id}

