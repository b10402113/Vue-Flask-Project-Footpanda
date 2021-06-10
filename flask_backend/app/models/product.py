from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import db, Base

from app.models.base import Base

__author__ = '七月'


class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    # store = relationship('Store')
    sid = Column(Integer, ForeignKey('store.id'))
    name = Column(String(15), nullable=False)
    price = Column(Integer, nullable=False)
    category = Column(String(15))
    order_products = db.relationship('OrderProduct',backref='product')
    img = db.Column(db.LargeBinary(length=65536), nullable=False)
    def to_dict(self):
        """将订单信息转换为字典数据"""
        product_dict = {
            "id":self.id,
            "name": self.name,
            "store_name": self.store.name,
            "price":self.price,
            "category":self.category
        }
        return product_dict
    # 指名要序列化的屬性
    def keys(self):
        return ['id', 'name', 'price']

    @staticmethod
    def create_product(name, price, sid,category,img):
        with db.auto_commit():
            prodcut = Product()
            prodcut.name = name
            prodcut.price = price
            prodcut.sid = sid
            prodcut.category = category
            prodcut.img = img

            db.session.add(prodcut)




