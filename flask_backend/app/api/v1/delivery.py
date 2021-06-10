from flask import jsonify, g
import time
from app.libs.enums import ClientTypeEnum, OrderStatusEnum
from app.libs.error_code import DeleteSuccess, AuthFailed, ParameterException, Success
from app.libs.redprint import Redprint
from app.libs.token_auth import auth
from app.models.base import db
from app.models.order_product import OrderProduct
from app.models.order import Order
from app.models.customer import Customer
from functools import wraps
from flask import g, request, redirect, url_for
from app.libs.token_auth import auth
from app.models.order import Order
from app.models.product import Product
from app.validators.forms import ProductSubmitForm, OrderDeliveryForm
import datetime

__author__ = '七月'

api = Redprint('delivery')


def is_delivery(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            if ClientTypeEnum(g.user.ac_type) != ClientTypeEnum.DELIVERY:
                raise AuthFailed('No Right!')


        except ValueError as e:
            raise e

        print(g.user.ac_type)
        return f(*args, **kwargs)

    return decorated_function


# @api.route('', methods=['GET'])
# @auth.login_required
# @is_delivery
# def get_delivery():
#     customer = Customer.query.get(g.user.uid)
#     g.customer = customer
#     r = {
#         'name': customer.name,
#         'email': customer.email
#     }
#
#     return jsonify(customer)

@api.route('/orders', methods=['GET'])
def get_orders():
    print(OrderStatusEnum.WAIT_CATCH)
    orders = Order.query.filter_by(status=OrderStatusEnum.WAIT_CATCH.value).all()
    order_list = [order.to_delivery_dict() for order in orders]

    return jsonify(error_code=200,list=order_list)

@api.route('/delivery_orders', methods=['GET'])
@auth.login_required
@is_delivery
def get_delivery_orders():
    print(OrderStatusEnum.WAIT_CATCH)
    orders = Order.query.filter_by(delivery_id= g.user.uid).all()
    order_list = [order.to_delivery_dict() for order in orders]

    return jsonify(error_code=200,list=order_list)

@api.route('/orders', methods=['PUT'])
@auth.login_required
@is_delivery
def catch_order():
    form = OrderDeliveryForm().validate_for_api()
    order_id = form.order_id.data
    order = Order.query.filter_by(id=order_id).first()
    if not order:
        raise ParameterException('訂單編號不存在')

    if order.status != OrderStatusEnum.WAIT_CATCH.value:
        raise ParameterException('訂單編號不正確')

    order.status = OrderStatusEnum.WAIT_DELIVER.value
    order.delivery_id = g.user.uid
    db.session.add(order)
    db.session.commit()


    return Success()