"""
 Created by 七月 on 2018/5/8.
"""
from flask import jsonify, g,send_file
from flask_cors import cross_origin
import io

from app.libs.enums import ClientTypeEnum, OrderStatusEnum
from app.libs.error_code import DeleteSuccess, AuthFailed, DuplicateProduct, Success
from app.libs.redprint import Redprint
from app.libs.token_auth import auth
from app.models.base import db
from app.models import store
from app.models.customer import Customer
from app.models.store import Store
from app.models.product import Product
from app.models.product_image import ProductImage
from app.models.order import Order
from app.models.order_product import OrderProduct
from functools import wraps
from flask import g, request, redirect, url_for
from app.libs.token_auth import auth
from app.validators.forms import ProductForm

__author__ = '七月'

api = Redprint('store')


def is_store(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            if ClientTypeEnum(g.user.ac_type) != ClientTypeEnum.STORE:
                raise AuthFailed('No Right!')

        except ValueError as e:
                raise e

        print(g.user.ac_type)
        return f(*args, **kwargs)
    return decorated_function

@api.route('', methods=['GET'])
@auth.login_required
@is_store
def get_store():
    store = Store.query.get(g.user.uid)
    return jsonify(error_code=201,data=store.to_dict())

@api.route('/orders', methods=['GET'])
@auth.login_required
@is_store
def get_orders():
    store = Store.query.get(g.user.uid)
    order_list = [order.to_dict() for order in store.orders]


    return jsonify(error_code=200,data=order_list)

@api.route('/orders', methods=['PUT'])
@auth.login_required
@is_store
def modify_orders():
    sid = g.user.uid
    order_id =  request.get_json()['order_id']
    order = Order.query.filter_by(id=order_id, store_id=sid,status='WAIT_ACCEPT').first()
    if not order:
        return jsonify(error_code=400,msg='訂單確認失敗')
    order.status = OrderStatusEnum.WAIT_CATCH.value
    db.session.add(order)
    db.session.commit()

    return jsonify(error_code=200,msg='確認成功')

@api.route('/product_img', methods=['POST'])
@auth.login_required
@is_store
def post_porduct_img():
    # image_file = request.files.get("img")


    product_id = request.form.get("product_id")

    file = request.files['img'].read()

    product_img = ProductImage()
    product_img.img = file
    product_img.product_id = product_id
    db.session.add(product_img)
    db.session.commit()


    return Success()


@api.route('/product', methods=['POST'])
@auth.login_required
@is_store
def post_product():
    img = request.files['img'].read()
    sid = g.user.uid
    name = request.form.get("name")
    price = request.form.get("price")
    category = request.form.get("category")
    product = Product.query.filter_by(name=name, sid=sid).first()
    if product:
        raise DuplicateProduct()

    Product.create_product(name,price,sid,category,img)


    return Success()

@api.route('/product', methods=['PUT'])
@auth.login_required
@is_store
def put_product():
    sid = g.user.uid
    id = request.form.get("id")
    name = request.form.get("name")
    price = request.form.get("price")
    category = request.form.get("category")
    product = Product.query.filter_by(id=id, sid=sid).first()
    if not product:
        raise DuplicateProduct('no such product')
    product.name = name
    product.price = price
    product.category = category
    db.session.add(product)
    db.session.commit()

    return Success()

@api.route('/product', methods=['DELETE'])
@auth.login_required
@is_store
def delete_porduct():
    sid = g.user.uid
    id = request.get_json()['id']

    product = Product.query.filter_by(id=id, sid=sid).first()
    if not product:
        raise DuplicateProduct('no such product')
    db.session.delete(product)
    db.session.commit()

    return Success()

@api.route('/product', methods=['GET'])
@auth.login_required
@is_store
def get_porduct():
    sid = g.user.uid
    products = Product.query.filter_by(sid=sid).all()
    product_list = []
    print(products)
    product_list = [product.to_dict() for product in products ]

    return jsonify(error_code=200, data={"list": product_list})

@api.route('/product/<int:sid>', methods=['GET'])
def get_store_porduct(sid):

    products = Product.query.filter_by(sid=sid).all()
    product_list = []

    if products:
        for product in products:
            product_list.append(product.to_dict())

    return jsonify(error_code='200', data={"list": product_list})

@api.route('/product/<int:sid>/<string:category>', methods=['GET'])
def search_store_porduct(sid,category):

    products = Product.query.filter_by(sid=sid,category=category).all()
    product_list = []

    if products:
        for product in products:
            product_list.append(product.to_dict())

    return jsonify(error_code='200', data={"list": product_list})


@api.route('/<string:store_name>', methods=['GET'])
def search_store_by_name(store_name):
    if store_name == 'all':
        stores = Store.query.all()
    else:
        stores = Store.query.filter(Store.name.like('%' + store_name + '%')).all()
    store_list = []
    if stores:
        for store in stores:
            store_list.append(store.to_dict())

    return jsonify(error_code='201', data={"list": store_list})
# courses = courses.filter(models.Course.name.like('%' + searchForm.courseName.data + '%'))

@api.route('/product_img/<int:id>', methods=['GET'])
def get_product_img(id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return jsonify(error_code=400)
    img = product.img

    return send_file(io.BytesIO(img),
                     attachment_filename='logo.png',
                     mimetype='image/png')


