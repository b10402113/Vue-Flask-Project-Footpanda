from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import db, Base

from app.models.base import Base

__author__ = '七月'


class ProductImage(Base):
    id = Column(Integer, primary_key=True)
    product_id = db.Column(db.Integer,db.ForeignKey('product.id'),nullable=False)
    img = db.Column(db.LargeBinary(length=65536),nullable=False)
