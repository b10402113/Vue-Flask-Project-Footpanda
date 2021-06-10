from wtforms import StringField, IntegerField, FieldList, FormField, Field
from wtforms.validators import DataRequired, length, Email, Regexp,ValidationError
from app.libs.enums import ClientTypeEnum
from app.models.customer import Customer
from app.models.delievery import Delivery
from app.models.store import Store
from app.models.user import User
from app.validators.base import BaseForm as Form


class ClientForm(Form):
    account = StringField(validators=[DataRequired(), length(
        min = 5, max = 32
    )])
    secret = StringField()
    # name = StringField(validators=[DataRequired(),
    #                                        length(min=2, max=22)])
    type = IntegerField(validators=[DataRequired()])

    def validate_type(self,value):
        try:
            client = ClientTypeEnum(value.data)
        except ValueError as e:
            raise e
        self.type.data = client
        print('self.type.data',self.type.data)


class RegisterForm(ClientForm):
    name = StringField(validators=[DataRequired(),
                                           length(min=2, max=22)])
    def validate_account(self, value):

        promise = {
            ClientTypeEnum.CUSTOMER: Customer,
            ClientTypeEnum.STORE: Store,
            ClientTypeEnum.DELIVERY: Delivery,
        }

        if promise[ClientTypeEnum(self.type.data)].query.filter_by(email=value.data).first():
            print('promise', promise)
            raise ValidationError('用戶已存在')

class OrderProductForm(Field):
    id = IntegerField(validators=[DataRequired()])
    count = IntegerField(validators=[DataRequired()])

class ProductSubmitForm(Form):
    # https://prettyprinted.com/tutorials/how-to-use-fieldlist-in-flask-wtf
    # https://wtforms-json.readthedocs.io/en/latest/
    # products = FieldList(FormField(ProductForm), min_entries=1, max_entries=8)
    products = OrderProductForm()
    sid = IntegerField(validators=[DataRequired()])
    customer_address = StringField(validators=[DataRequired()])


class ProductForm(Form):
    name = StringField(validators=[DataRequired(), length(
        min = 1, max = 10
    )])
    category = StringField(validators=[DataRequired(), length(
        min = 1, max = 10
    )])
    price = IntegerField(validators=[DataRequired()])

class OrderDeliveryForm(Form):
    order_id = StringField(validators=[DataRequired()])

class OrderAcceptForm(Form):
    order = StringField(validators=[DataRequired()])


