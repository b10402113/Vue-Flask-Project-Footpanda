from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import db, Base

from app.models.base import Base

__author__ = '七月'


class OrderProduct(Base):
    __tablename__ = 'order_product'
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('order.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    count = Column(Integer, nullable=False)

    def __init__(self,order_id,product_id,count):
        self.order_id = order_id
        self.product_id = product_id
        self.count = count

    def to_dict(self):
        """将订单信息转换为字典数据"""
        if self.product:
            order_product_dict = {
                "id":self.id,
                "count": self.count,
                "product_name":self.product.name,
                "amount": self.count * self.product.price
            }
        else:
            order_product_dict = {
                "id":self.id,
                "count": self.count,
            }
        return order_product_dict
    def get_amount(self):
        return self.count * self.product.price
    # 指名要序列化的屬性
    def keys(self):
        return ['id', 'name', 'price']

    # @staticmethod
    # def create_product(name, price, sid):
    #     with db.auto_commit():
    #         prodcut = Product()
    #         prodcut.name = name
    #         prodcut.price = price
    #         prodcut.sid = sid
    #
    #         db.session.add(prodcut)




