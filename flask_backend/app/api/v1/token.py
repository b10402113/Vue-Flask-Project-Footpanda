
from flask import current_app, jsonify

from app.libs.enums import ClientTypeEnum
from app.libs.error_code import AuthFailed
from app.libs.redprint import Redprint
from app.models.customer import Customer
from app.models.delievery import Delivery
from app.models.store import Store
from app.models.user import User
from app.validators.forms import ClientForm
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired, \
    BadSignature

api = Redprint('token')

__author__ = '七月'


@api.route('', methods=['POST'])
def get_token():
    form = ClientForm().validate_for_api()

    promise = {
        ClientTypeEnum.STORE: Store.verify,
        ClientTypeEnum.DELIVERY: Delivery.verify,
        ClientTypeEnum.CUSTOMER: Customer.verify,
    }
    identity = promise[ClientTypeEnum(form.type.data)](
        form.account.data,
        form.secret.data
    )

    # identity = User.verify(form.account.data,form.secret.data,form.type.data)
    print(identity)
    print(form.type.data)
    # Token
    expiration = current_app.config['TOKEN_EXPIRATION']
    token = generate_auth_token(identity['uid'],
                                form.type.data,
                                expiration)
    t = {
        'token': token.decode('ascii')
    }
    return jsonify(error_code=200, data=t)

def generate_auth_token(uid, ac_type,  expiration=720000):
    """生成令牌"""
    s = Serializer(current_app.config['SECRET_KEY'],
                   expires_in=expiration)
    return s.dumps({
        'uid': uid,
        'type': ac_type.value,
        'scope':""
    })