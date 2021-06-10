from app.libs.error_code import ClientTypeError, Success
from app.models.customer import Customer
from app.models.store import Store
from app.models.delievery import Delivery
from app.models.user import User

__author__ = 'Andy'
from app.libs.redprint import Redprint
from flask import request
from app.validators.forms import ClientForm, RegisterForm
from app.libs.enums import ClientTypeEnum


api = Redprint('client')

@api.route('/register',methods=['POST'])
def create_client():
    form = RegisterForm().validate_for_api()
    promise = {
        ClientTypeEnum.CUSTOMER:Customer,
        ClientTypeEnum.STORE: Store,
        ClientTypeEnum.DELIVERY: Delivery,
    }
    promise[form.type.data].register_by_email(form.name.data, form.account.data, form.secret.data)
    return Success()

    pass
# def __register_customer_user():
#     form = ClientForm(data=request.json)
#     if form.validate():
#         Customer.register_by_email(form.name.data,form.account.data,form.secret.data)

