
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import db, Base
from app.models.order_product import OrderProduct

from app.models.base import Base

class Order(Base):
    """订单"""

    __tablename__ = 'order'

    id = db.Column(db.Integer, primary_key=True)  # 订单编号
    customer_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)  # 下订单的用户编号
    store_id = db.Column(db.Integer, db.ForeignKey("store.id"), nullable=False)  # 预订的房间编号
    delivery_id = db.Column(db.Integer, db.ForeignKey("delivery.id"))  # 预订的房间编号
    amount = db.Column(db.Integer, nullable=False)  # 订单的总金额
    products = db.relationship("OrderProduct", backref="order")
    customer_address = db.Column(String(100), nullable=False)
    status = db.Column(  # 订单的状态
        db.Enum(   # 枚举
            "WAIT_ACCEPT",  # 待接单,
            "WAIT_CATCH",  # 待提取
            "WAIT_DELIVER",  # 待送達
            "COMPLETE",  # 已完成
            "CANCELED",  # 已取消
            "REJECTED"  # 已拒单
        ),
        default="WAIT_ACCEPT", index=True)    # 指明在mysql中这个字段建立索引，加快查询速度

    def __init__(self,order_id,sid,customer_id,amount,customer_address):
        self.id = order_id
        self.store_id = sid
        self.customer_id = customer_id
        self.amount = amount
        self.customer_address = customer_address



    def to_dict(self):
        """将订单信息转换为字典数据"""
        order_dict = {
            "id": self.id,
            "customer_id": self.customer_id,
            "store_id": self.store_id,
            "delivery_id": self.delivery_id,
            "amount": self.amount,
            "status": self.status,
            "products":[order_product.to_dict() for order_product in self.products],
            "create_time":self.create_time
        }
        return order_dict

    def to_delivery_dict(self):
        """将订单信息转换为字典数据"""
        order_dict = {
            "id": self.id,
            "customer_name": self.customer.name,
            "store_name": self.store.name,
            "amount": self.amount,
            "status": self.status,
            "products":[order_product.to_dict() for order_product in self.products],
            "address":self.customer_address,
            "create_time": self.create_time
        }
        return order_dict

