from flask import Blueprint
from app.api.v1 import user, client, token, customer, store, delivery


def create_blueprint_v1():
    bp_v1 = Blueprint('v1', __name__)

    user.api.register(bp_v1)
    # http://127.0.0.1:5000/v1/user/test
    # book.api.register(bp_v1)
    client.api.register(bp_v1)
    token.api.register(bp_v1)
    customer.api.register(bp_v1)
    store.api.register(bp_v1)
    delivery.api.register(bp_v1)
    # gift.api.register(bp_v1)
    return bp_v1