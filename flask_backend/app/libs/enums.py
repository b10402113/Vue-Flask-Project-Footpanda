"""
 Created by 七月 on 2018/5/10.
"""

__author__ = '七月'

from enum import Enum

class OrderStatusEnum(Enum):
    WAIT_ACCEPT   = "WAIT_ACCEPT"  # 待接单,
    WAIT_CATCH=    "WAIT_CATCH" # 待提取
    WAIT_DELIVER=    "WAIT_DELIVER" # 待提取
    COMPLETE=    "COMPLETE" # 已完成
    CANCELED=    "CANCELED"  # 已取消
    REJECTED=    "REJECTED"  # 已拒单

class ClientTypeEnum(Enum):
    USER_EMAIL = 100
    USER_MOBILE = 101

    # 微信小程序
    USER_MINA = 200
    # 微信公众号
    USER_WX = 201


    CUSTOMER = 1
    STORE = 2
    DELIVERY = 3

