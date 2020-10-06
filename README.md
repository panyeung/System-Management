This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
username: admin
password: admin

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Server API

## Index：

    1). Login
    2). Add User
    3). update User
    4). get User list
    5). delete user
    6). Get first Order/ second Order categories
    7). Add category
    8). Update Category
    9). Get Category by ID
    10). Get Product Pages
    11). Search according to Product Name
    12). Add Product
    13). Update Product
    14). Product onshelf/ offshelf
    15). Upload Picture
    16). Delete Picture
    17). Add Role
    18). Get role list
    19). Update role access
    20). Get weather Information

## 1. Login

### request URL：

    http://localhost:5000/login

### request method：

    POST

### parameter types

    |param		|require |type     |
    |username    |Y       |string   |
    |password    |Y       |string   |

### return value：

    success:
      {
        "status": 0,
        "data": {
          "_id": "5c3b297dea95883f340178b0",
          "password": "21232f297a57a5a743894a0e4a801fc3",
          "username": "admin",
          "create_time": 1547381117891,
          "__v": 0,
          "role": {
            "menus": []
          }
        }
      }
    failure:
      {
        "status": 1,
        "msg": "Username and password incorrect"
      }

## 2. Add User

### Request URL：

    http://localhost:5000/manage/user/add

### Request method：

    POST

### Param types

    |param		|require |type     |
    |username    |Y       |string   |
    |password    |Y       |string   |
    |phone       |N       |string   |
    |email       |N       |string   |
    |role_id     |N       |string   |

### return type：

    success:
      {
        "status": 0,
        "data": {
          "_id": "5c3b382c82a14446f4ffb647",
          "username": "admin6",
          "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
          "phone": "13712341234",
          "email": "test@gmail.com",
          "create_time": 1547384876804,
          "__v": 0
        }
      }
    failure
      {
        "status": 1,
        "msg": "user already exist"
      }

## 3. Update User

### request URL：

    http://localhost:5000/manage/user/update

### request type：

    POST

### param type

    |params		|required |type     |
    |_id         |Y       |string   |
    |username    |N       |string   |
    |phone       |N       |string   |
    |email       |N       |string   |
    |role_id     |N       |string   |

### return type：

    success:
      {
        "status": 0,
        "data": {
          "_id": "5c3b382c82a14446f4ffb647",
          "username": "admin6",
          "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
          "phone": "13712341234",
          "email": "test@gmail.com",
          "create_time": 1547384876804,
          "__v": 0
        }
      }
    failure
      {
        "status": 1,
        "msg": "User already exist"
      }

## 4. Get all the user list

### request URL：

    http://localhost:5000/manage/user/list

### request type：

    GET

### param type:

    None

### return type：

    {
      "status": 0,
      "data": {
        "users": [
          {
            "_id": "5cb05b4db6ed8c44f42c9af2",
            "username": "test",
            "password": "202cb962ac59075b964b07152d234b70",
            "phone": "123412342134",
            "email": "sd",
            "role_id": "5ca9eab0b49ef916541160d4",
            "create_time": 1555061581734,
            "__v": 0
          },
          {
            "_id": "5cb05b69b6ed8c44f42c9af3",
            "username": "ss22",
            "password": "123",
            "phone": "23343",
            "email": "df",
            "role_id": "5caf5444c61376319cef80a8",
            "create_time": 1555061609666,
            "__v": 0
          }
        ],
        "roles": [
          {
            "menus": [
              "/home",
              "/role",
              "/category",
              "/products",
              "/product",
              "/charts/bar"
            ],
            "_id": "5ca9eaa1b49ef916541160d3",
            "name": "test",
            "create_time": 1554639521749,
            "__v": 0,
            "auth_time": 1555145863489,
            "auth_name": "admin"
          }
        ]
      }
    }

## 5. Delete User

### request URL：

    http://localhost:5000/manage/user/delete

### request type：

    POST

### request param:

    |param		|require |type     |desc
    |userId     |Y       |string   |userId

### sample response：

    {
      "status": 0
    }

## 6. Getting category list

### request URL：

    http://localhost:5000/manage/category/list

### request type：

    GET

### query

    |params		|required |type     |description
    |parentId    |Y       |string   |parent category's ID

### sample response：

      {
        "status": 0,
        "data": [
          {
            "parentId": "0",
            "_id": "5c2ed631f352726338607046",
            "name": "001",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed647f352726338607047",
            "name": "2",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed64cf352726338607048",
            "name": "3",
            "__v": 0
          }
        ]
      },
      {
        "status": 0,
        "data": [
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed65df352726338607049",
            "name": "3333",
            "__v": 0
          },
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed66ff35272633860704a",
            "name": "34",
            "__v": 0
          }
        ]
      }

## 7. Add Category

### request URL：

    http://localhost:5000/manage/category/add

### request type：

    POST

### params:

    |params		|required |type     |description
    |parentId      |Y       |string   |parent's category ID
    |categoryName  |Y       |string   |name

### 返回示例：

        {
          "status": 0,
          "data": {
            "parentId": "0",
            "_id": "5c3ec1534594a00e5877b841",
            "name": "9",
            "__v": 0
          }
        }
        {
          "status": 0,
          "data": {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c3ec1814594a00e5877b842",
            "name": "39",
            "__v": 0
          }
        }

## 8. update category

### request URL：

    http://localhost:5000/manage/category/update

### request type:

    POST

### request params:

    |params		|required |type     |description
    |categoryId    |Y       |string   |parent category's Id
    |categoryName  |Y       |string   |name

### sample response:

    {
      "status": 0
    }

## 9. Get Category by ID

### request URL：

    http://localhost:5000/manage/category/info

### request type:

    GET

### request Param:

    |param		|required |type     |description
    |categoryId    |Y       |string   |父级分类的ID

### sample response：

    {
      "status": 0,
      "data": {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      }
    }

## 10. get product list

### request URL：

    http://localhost:5000/manage/product/list

### request type:

    GET

### request param:

    |param		|required |type     |description
    |pageNum    |Y       |Number   |page number
    |pageSize   |Y       |Number   |how many per page

### sample response:

    {
        "status": 0,
        "data": {
            "pageNum": 1,
            "total": 12,
            "pages": 3,
            "pageSize": 5,
            "list": [
                {
                    "status": 1,
                    "imgs": [
                        "image-1559402396338.jpg"
                    ],
                    "_id": "5ca9e05db49ef916541160cd",
                    "name": "4809",
                    "desc": "X390、T490",
                    "price": 65999,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db9fb49ef916541160cc",
                    "detail": "<p>99999</span></p>\n",
                    "__v": 0
                },
                {
                    "status": 1,
                    "imgs": [
                        "image-1559402448049.jpg",
                        "image-1559402450480.jpg"
                    ],
                    "_id": "5ca9e414b49ef916541160ce",
                    "name": "ASUS",
                    "desc": "i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS",
                    "price": 6799,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db8ab49ef916541160cb",
                    "detail": "<p></span>&nbsp;</p>\n",
                    "__v": 0
                },
                {
                    "status": 2,
                    "imgs": [
                        "image-1559402436395.jpg"
                    ],
                    "_id": "5ca9e4b7b49ef916541160cf",
                    "name": "js",
                    "desc": "[You Don't Know JS:Scope & Closures] JavaScript",
                    "price": 35,
                    "pCategoryId": "0",
                    "categoryId": "5ca9d6c9b49ef916541160bc",
                    "detail": "<p style=\"text-align:start;\"></p>\n",
                    "__v": 0
                },
                {
                    "status": 2,
                    "imgs": [
                        "image-1554638240202.jpg"
                    ],
                    "_id": "5ca9e5bbb49ef916541160d0",
                    "name": "BCD-213TM",
                    "desc": "",
                    "price": 1388,
                    "pCategoryId": "5ca9d695b49ef916541160ba",
                    "categoryId": "5ca9d9cfb49ef916541160c4",
                    "detail": "<p style=\"text-align:start;\"><span style=\</p>\n",
                    "__v": 0
                },

            ]
        }
    }

## 11. search based on ID/name of the product

### request URL：

    http://localhost:5000/manage/product/search?pageNum=1&pageSize=5&productName=T

### request type:

    GET

### request param:

    |param		|required |type     |description
    |pageNum       |Y       |Number   |pageNum
    |pageSize      |Y       |Number   |pageSize
    |productName   |N       |String   |productName you want to search
    |productDesc   |N       |String   |productDes you want to search

### sample response:

    {
        "status": 0,
        "data": {
            "pageNum": 1,
            "total": 3,
            "pages": 1,
            "pageSize": 5,
            "list": [
                {
                    "status": 1,
                    "imgs": [
                        "image-1559402396338.jpg"
                    ],
                    "_id": "5ca9e05db49ef916541160cd",
                    "name": "4809",
                    "desc": "X390、T490",
                    "price": 65999,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db9fb49ef916541160cc",
                    "detail": "<p></p>\n",
                    "__v": 0
                },
                {
                    "status": 2,
                    "imgs": [
                        "image-1554638240202.jpg"
                    ],
                    "_id": "5ca9e5bbb49ef916541160d0",
                    "name": "-BCD-213TM",
                    "desc": "",
                    "price": 1388,
                    "pCategoryId": "5ca9d695b49ef916541160ba",
                    "categoryId": "5ca9d9cfb49ef916541160c4",
                    "detail": "<p style=\"text-align:start;\"></span>&nbsp;</p>\n",
                    "__v": 0
                },
                {
                    "status": 1,
                    "imgs": [
                        "image-1554638676149.jpg",
                        "image-1554638683746.jpg"
                    ],
                    "_id": "5ca9e773b49ef916541160d2",
                    "name": "ThinkPad X1 Carbon",
                    "desc": "（i5-8250U 8G 256GSSD FHD）",
                    "price": 9999,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db78b49ef916541160ca",
                    "detail": "<p style=\"text-align:start;\"></p>\n",
                    "__v": 0
                }
            ]
        }
    }

## 12. Add product

### request URL：

    http://localhost:5000/manage/product/add

### request type:

    POST

### params type:

    |param		|required |type
    |categoryId    |Y       |string  
    |pCategoryId   |Y       |string  
    |name          |Y       |string  
    |desc          |N       |string  
    |price         |N       |string  
    |detail        |N       |string  
    |imgs          |N       |array  

### sample response：

    {
        "status": 0,
        "data": {
            "status": 1,
            "imgs": [
                "image-1559467198366.jpg"
            ],
            "_id": "5cf394d29929a304dcc0c6eb",
            "name": "A",
            "desc": "notebook",
            "price": 11111,
            "detail": "<p><strong>abc</strong></p>\n",
            "pCategoryId": "5ca9d6c0b49ef916541160bb",
            "categoryId": "5ca9db78b49ef916541160ca",
            "__v": 0
        }
    }

## 13. update product

### request URL：

    http://localhost:5000/manage/product/update

### request type:

    POST

### param type:

    |param		|required |type     |
    |_id           |Y       |string   |
    |categoryId    |Y       |string   |
    |pCategoryId   |Y       |string   |
    |name          |Y       |string   |
    |desc          |N       |string   |
    |price         |N       |string   |
    |detail        |N       |string   |
    |imgs          |N       |array   |

### sample response：

    {
      "status": 0
    }

## 14. Product status update

### request URL：

    http://localhost:5000/manage/product/updateStatus

### request type:

    POST

### request param:

    |param		|required |type     |
    |productId    |Y       |string   |
    |status       |Y       |number   |

### sample response:

    {
      "status": 0
    }

## 15. upload picture

### request URL：

    http://localhost:5000/manage/img/upload

### sample response:

    POST

### params type:

    |param		|required |type     |description
    |image  |Y       |file   |picture file

### sample response：

    {
        "status": 0,
        "data": {
            "name": "image-1559466841118.jpg",
            "url": "http://localhost:5000/upload/image-1559466841118.jpg"
        }
    }

## 16. delete picture

### request URL：

    http://localhost:5000/manage/img/delete

### request type:

    POST

### param type:

    |param		|required |type     |description
    |name    |Y       |string   |picture file name

### sample response:

    {
      "status": 0
    }

## 17. Add role

### request URL：

    http://localhost:5000/manage/role/add

### request type：

    POST

### param:

    |param		|required |type     |
    |roleName    |Y       |string   |

### sample response：

    {
        "status": 0,
        "data": {
            "menus": [],
            "_id": "5cf39a319929a304dcc0c6ec",
            "name": "rolex",
            "create_time": 1559468593702,
            "__v": 0
        }
    }

## 18. Get Role list

### request URL：

    http://localhost:5000/manage/role/list

### request type：

    GET

### param:

    None

### sample Response：

    {
        "status": 0,
        "data": [
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "5ca9eaa1b49ef916541160d3",
                "name": "test",
                "create_time": 1554639521749,
                "__v": 0,
                "auth_time": 1558679920395,
                "auth_name": "test007"
            },
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/charts/line",
                    "/category",
                    "/product",
                    "/products"
                ],
                "_id": "5ca9eab0b49ef916541160d4",
                "name": "manager",
                "create_time": 1554639536419,
                "__v": 0,
                "auth_time": 1558506990798,
                "auth_name": "test008"
            },
            {
                "menus": [
                    "/home",
                    "/products",
                    "/category",
                    "/product",
                    "/role"
                ],
                "_id": "5ca9eac0b49ef916541160d5",
                "name": "role1",
                "create_time": 1554639552758,
                "__v": 0,
                "auth_time": 1557630307021,
                "auth_name": "admin"
            }
        ]
    }

## 19. update role(assign role access)

### request URL：

    http://localhost:5000/manage/role/update

### request type：

    POST

### param:

    |param		|required |type     |
    |_id          |Y       |string   |
    |menus        |Y       |array    |
    |auth_time    |Y       |number   |
    |auth_name    |Y       |string   |

### sample response:

    {
        "status": 0,
        "data": {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/category",
                "/user"
            ],
            "_id": "5ca9eaa1b49ef916541160d3",
            "name": "test",
            "create_time": 1554639521749,
            "__v": 0,
            "auth_time": 1559469116470,
            "auth_name": "admin"
        }
    }
