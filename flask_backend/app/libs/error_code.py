"""
 Created by 七月 on 2018/5/12.
"""
from werkzeug.exceptions import HTTPException

from app.libs.error import APIException

__author__ = '七月'


class Success(APIException):
    code = 200
    msg = 'ok'
    error_code = 200


class DeleteSuccess(Success):
    code = 200
    error_code = 1


class ServerError(APIException):
    code = 200
    msg = 'sorry, we made a mistake (*￣︶￣)!'
    error_code = 999


class ClientTypeError(APIException):
    # 400 401 403 404
    # 500
    # 200 201 204
    # 301 302
    code = 200
    msg = 'client is invalid'
    error_code = 1006


class ParameterException(APIException):
    code = 200
    msg = 'invalid parameter'
    error_code = 1000


class NotFound(APIException):
    code = 200
    msg = 'the resource are not found O__O...'
    error_code = 1001


class AuthFailed(APIException):
    code = 200
    error_code = 1005
    msg = 'authorization failed'


class Forbidden(APIException):
    code = 200
    error_code = 1004
    msg = 'forbidden, not in scope'


class DuplicateProduct(APIException):
    code = 200
    error_code = 2001
    msg = 'the product has already in gift'