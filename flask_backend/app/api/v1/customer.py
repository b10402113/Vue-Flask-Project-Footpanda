"""
 Created by 七月 on 2018/5/8.
"""
from flask import jsonify, g
import time
from app.libs.enums import ClientTypeEnum, OrderStatusEnum
from app.libs.error_code import DeleteSuccess, AuthFailed, ParameterException
from app.libs.redprint import Redprint
from app.libs.token_auth import auth
from app.models.base import db
from app.models.order_product import OrderProduct
from app.models.customer import Customer
from functools import wraps
from flask import g, request, redirect, url_for
from app.libs.token_auth import auth
from app.models.order import Order
from app.models.product import Product
from app.validators.forms import ProductSubmitForm
import datetime

__author__ = '七月'

api = Redprint('customer')


def is_customer(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            if ClientTypeEnum(g.user.ac_type) != ClientTypeEnum.CUSTOMER:
                raise AuthFailed('No Right!')


        except ValueError as e:
            raise e

        print(g.user.ac_type)
        return f(*args, **kwargs)

    return decorated_function


@api.route('', methods=['GET'])
@auth.login_required
@is_customer
def get_customer():
    customer = Customer.query.get(g.user.uid)
    g.customer = customer
    r = {
        'name': customer.name,
        'email': customer.email
    }

    return jsonify(customer)


@api.route('/orders', methods=['POST'])
@auth.login_required
@is_customer
def create_order():
    # {"store_id"}

    customer_id = g.user.uid
    form = ProductSubmitForm().validate_for_api()
    order_id = generate_order_id()
    amount = 0
    order_products = []

    if len(form.products.data) == 0:
        raise ParameterException('商品不可為空')
    for product in form.products.data:
        print(product.get('id'))
        p = Product.query.get(product.get('id'))
        if not p:
            raise ParameterException('無此product id')
        order_product = OrderProduct(
            order_id=order_id,
            product_id=product.get('id'),
            count=product.get('count')
        )
        order_products.append(order_product)
        amount = amount + (order_product.count * p.price)
    print(amount)
    # db.session.commit()
    order = Order(
        order_id =order_id,
        customer_id=customer_id,
        sid=form.sid.data,
        amount=amount,
        customer_address=form.customer_address.data
    )
    db.session.add(order)

    for order_product in order_products:
        db.session.add(order_product)
    db.session.commit()

    return jsonify(error_code=200,data=order.to_dict())


@api.route('/orders', methods=['GET'])
@auth.login_required
@is_customer
def get_order():

    customer = Customer.query.get(g.user.uid)
    order_list = [order.to_dict() for order in customer.orders]

    return jsonify(error_code=200, data=order_list)

@api.route('/orders', methods=['DELETE'])
@auth.login_required
@is_customer
def delete_order():
    order_data = request.get_json(silent=True)
    customer = Customer.query.get(g.user.uid)
    print(order_data)
    order = Order.query.filter_by(customer_id=customer.id,id=order_data['order_id'],status="WAIT_ACCEPT").first()
    if not order:
        return jsonify(error_code=400, msg='不可刪除')
    print(order)
    db.session.delete(order)
    db.session.commit()
    return jsonify(error_code=200, msg='刪除成功')

@api.route('/orders', methods=['PUT'])
@auth.login_required
@is_customer
def put_order():
    order_data = request.get_json()
    print(order_data['order_id'])
    customer_id = g.user.uid
    order = Order.query.filter_by(customer_id=customer_id,id=order_data['order_id'],status='WAIT_DELIVER').first()
    if not order:
        jsonify(error_code=400, msg='完成訂單失敗')
    order.status = OrderStatusEnum.COMPLETE.value
    db.session.add(order)
    db.session.commit()
    return jsonify(error_code=200, msg='完成訂單成功')


def generate_order_id():
    t = time.time()
    return int(t)