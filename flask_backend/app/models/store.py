from app.models.base import db, Base
from app.models.user import User
from sqlalchemy import inspect, Column, Integer, String, SmallInteger, orm
from app.libs.error_code import NotFound, AuthFailed
class Store(User):
    __tablename__ = 'store'
    products = db.relationship("Product", backref="store")
    orders = db.relationship("Order", backref="store")
    # 指名要序列化的屬性
    def keys(self):
        return ['id', 'email', 'name']

    def to_dict(self):
        """将订单信息转换为字典数据"""
        store_dict = {
            "id":self.id,
            "email": self.email,
            "name": self.name
        }
        return store_dict

    @staticmethod
    def register_by_email(name, account, secret):
        print(name)
        with db.auto_commit():
            store = Store()
            store.name = name
            store.email = account
            store.password = secret

            db.session.add(store)

    @staticmethod
    def verify(email, password):
        account = Store.query.filter_by(email=email).first()
        if not account:
            raise NotFound(msg='user not found')
        if not account.check_password(password):
            raise AuthFailed()
        return {'uid':account.id}

