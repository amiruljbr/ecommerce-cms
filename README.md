# E-COMMERCE-CMS
`Simple web application of E-Commerce. This app has :`
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
---
# RESTful endpoints
## Global Responses
_Response (500 - Unknown error)_
> This endpoint should always return response below,
```
{ "message": "Internal Server Error" }
```
---
## POST /register
> Create a new user account
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  role: <role input>,
  email: <email input>,
  password: <password input>
}
```
_Response (201)_
```
{
    "id": 3,
    "email": "admin1@gmail.com",
    "password": "$2b$10$qNG.WPGwg5B3csMMAmhkJuHIFp0YsCB3YyZtK3Jr2MFSKULkdya4m",
    "role": "admin",
    "updatedAt": "2020-06-27T09:45:14.756Z",
    "createdAt": "2020-06-27T09:45:14.756Z"
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": <langsung tulis message>
}
```
---
## POST /login
> Login for User exist
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  email: email: <email input>,
  password: <email password>
}
```
_Response (200)_
```
{
    "id": 1,
    "email": "admin@gmail.com",
    "role": "admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTMyMjk0MDB9.2M6BRlnM58RKB6yFoJOsmF_3ytOEp9jZB6ZTxmcE6EQ"
}
```
_Response (400 - Bad request)_
```
{ 
    "message": "email/username not found, Invalid, check email or password"
}
```
---

## GET /product
> Show All Product
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
  no need
```
_Response (200)_
```
[
    {
        "id": 8,
        "name": "Baju",
        "image_url": "https://i.imgur.com/FC2SJnI.jpg",
        "price": 10000,
        "stock": 5,
        "category": "",
        "createdAt": "2020-06-27T05:53:37.004Z",
        "updatedAt": "2020-06-27T05:53:37.004Z"
    },
    ...
]
```
---
## POST /product
> Create Product
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
{
    "name": <input name>,
    "image_url": <input image_url>,
    "price": <input price>
    "stock": <input stock>
}
```
_Response (201)_
```
{
  "id": 6,
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## DELETE /product/:id
> Delete product
---

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id product>
```
_Response (200)_
```
{
  message: "id 6 has been deleted"
}

```
_Response (400 - Bad request)_
```
{
  "message": "you're not authorize"
}

```
---
## GET /product/:id
> Get data from selected id


_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id product>
```
_Response (200)_
```
{
  "id": 6,
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## PUT /product/:id
> To submit Form Edit product


_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id product>
```
_Request Body_
```
{
    "name": <input name>,
    "image_url": <input image_url>,
    "price": <input price>
    "stock": <input stock>
}
```
_Response (200)_
```
{
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
}

```
_Response (400 - Bad request)_
```
  {
    "message": "you're not authorize"
  }

```