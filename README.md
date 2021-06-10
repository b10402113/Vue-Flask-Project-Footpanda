# Vue-Flask-Project-Footpanda
# Student Info

* M10802156 鄭和軒

# Project Description

It's a frontend and backend totally seperated project.

![image-20210609110015797](/Users/andycheng/Library/Application Support/typora-user-images/image-20210609110015797.png)

### Backend

**Flask** is a micro [web framework](https://en.wikipedia.org/wiki/Web_framework) written in [Python](https://en.wikipedia.org/wiki/Python_(programming_language)). It is classified as a [microframework](https://en.wikipedia.org/wiki/Microframework) because it does not require particular tools or libraries.

Run flask with python foodpanda.py, remember to install the packages from requirements.txt

![Flask logo.svg](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flask_logo.svg/220px-Flask_logo.svg.png)

## FrontEnd

* App: React Native
* Web: Vue-Cli

## Database

Mysql

## Project function

### 1. Customer, Store, Deliver,register and get login web token

```
- Register:
    [METHOD]: post
    [API]: /v1/client/register
    [PARAMETER]: 
    {
        "account":String,
        "name":String,
        "secret":String,
        // 1:Customer
        // 2:Store
        // 3:Deliver
        "type":Integer 
    }

- Login Web token:
    [METHOD]: post
    [API]: /v1/token
    [PARAMETER]: 
    {
        "account":String,
        "name":String,
        "type":Integer
    }
  
```

### 2. Customer Functions

```
- Get customer info:
    [METHOD]: get
    [API]: /v1/customer/
    [Auth]: token need
    [PARAMETER]: None

- Get customer orders:
    [METHOD]: post
    [API]: /v1/customer/orders
    [Auth]: token need
    [PARAMETER]: None
    
- Delete customer order thorugh order_id:
    [METHOD]: delete
    [API]: /v1/customer/orders
    [Auth]: token need
    [PARAMETER]: 
    {
        "order_id":String
    }
    
- Update customer order Complete thorugh order_id:
    [METHOD]: put
    [API]: /v1/customer/orders
    [Auth]: token need
    [PARAMETER]: 
    {
        "order_id":String
    }

```

### 3. Store Functions

```
- Get store info:
    [METHOD]: get
    [API]: /v1/store/
    [Auth]: token need
    [PARAMETER]: None

- Get store orders:
    [METHOD]: get
    [API]: /v1/store/orders
    [Auth]: token need
    [PARAMETER]: None
    
- Update store's order from WAIT_ACCEPT to WAIT_DELIVER
    [METHOD]: put
    [API]: /v1/store/orders
    [Auth]: token need
    [PARAMETER]: 
    {
        "order_id":String
    }
    
- Upload a product 
    [METHOD]: post
    [API]: /v1/store/product
    [Auth]: token need
    [PARAMETER FormData]: 
    {
        "name":String,
        "price":String,
        "category":String,
        "img":BLOB,
    }
    
- Delete a product 
    [METHOD]: delete
    [API]: /v1/store/product
    [Auth]: token need
    [PARAMETER]: 
    {
        "id":Integer
    }
    
- Update product info
    [METHOD]: put
    [API]: /v1/store/product
    [Auth]: token need
    [PARAMETER]: 
    {
        "id":Integer,
        "name":String,
        "price":String,
        "category":String
    }
    
- Get store's own product info
    [METHOD]: get
    [API]: /v1/store/product
    [Auth]: token need
    [PARAMETER]: 
    {
        "id":Integer,
        "name":String,
        "price":String,
        "category":String
    }
    
- Get store own product info from store_id(sid)
    [METHOD]: get
    [API]: /v1/store/product/<int:sid>
    [Auth]: No need
    
- Query store's product through category
    [METHOD]: get
    [API]: /v1/store/product/<int:sid>/<string:category>
    [Auth]: No need
    [PARAMETER]: sid:store_id,category:query string
    
- Query store through store's name
    [METHOD]: get
    [API]: /v1/store/<string:store_name>
    [Auth]: No need
 
 - Query store through store's name
    [METHOD]: get
    [API]: /v1/store/<string:store_name>
    [Auth]: No need
 
  - Get product Image through product id
    [METHOD]: get
    [API]: /v1/store/product_img/<int:id>
    [Auth]: No need
 
```



### 4. Deliver Functions

```
- Get orders that haven't been caught:
    [METHOD]: get
    [API]: /v1/delivery/orders
    [Auth]: no need

- Get orders that have been caught by the deliver:
    [METHOD]: get
    [API]: /v1/delivery/delivery_orders
    [Auth]: need token

- Update order info from 'WAIT_CATCH' to 'WATI_DELIVER' :
    [METHOD]: put
    [API]: /v1/delivery/orders
    [Auth]: token need
    [PARAMETER]: 
    {
        "order_id":Integer,
    }
```