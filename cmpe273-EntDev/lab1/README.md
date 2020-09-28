https://github.com/facebook/create-react-app
1. npx create-react-app my-app
2. cd my-app
3. npm start

React Bootstrap
https://devlog.jwgo.kr/2019/01/17/how-to-use-bootstrap-in-react/
1. npm install --save bootstrap
2. import 'bootstrap/dist/css/bootstrap.css' at src/index.js

Use only cookie for distributed backend services
(Set by server, for security reason)

Use CORS to block un-allowed access
(so that only allowed endpoint, e.g. API Gateway or LB, can access servers)

GET
1. profile 들어가면 /user?user_id=~~~넣어서 request
2. server에서 app.get("/user")에서 req.query로 user_id추출

components container따로 둬서
container page가 navbar, body를 포함하는 구조로 짜야 함
안그러면 계속 console 2번씩 찍힌다

How to deal with state go empty every refresh?
== LocalStorage
1. Store user data when login
2. Load when needed (e.g. profile) after refresh
3. Flush when logout

Redux at Signup, Login, Logout and Profile
1. Signup = Store ID, PW
2. Login = Load them automatically, Store user data after login, and every navbar use user name to print everytime 
3. Logout = Flush all the user related state
4. Profile = Use stored user data from Login

Redux at Restaurant's making events (?)

Restaurants List
1. Search = use WHERE + OR for dish names, cuisines, location, and mode of delivery
2. Filter = [Delivery, location], filter them after loading restaurants, and re-render

MYSQL VERSION (`SHOW VARIABLES LIKE "%version%";` from mysql console)
+-------------------------+------------------+
| Variable_name           | Value            |
+-------------------------+------------------+
| innodb_version          | 5.6.16           |
| protocol_version        | 10               |
| slave_type_conversions  |                  |
| version                 | 5.6.16-1~exp1    |
| version_comment         | (Ubuntu)         |
| version_compile_machine | x86_64           |
| version_compile_os      | debian-linux-gnu |
+-------------------------+------------------+

DB CONFIGURE
= dropConfigure.sql -> tableConfigure.sql -> seedConfigure.sql

Non existing page handle
1. With Cookie
    - if Non existing, then route to 404

2. Without Cookie
    - if Non existing, then route to 404
    - if existing other than restaurant list, user login, and sign up, then route to userLoging
        - Make sure that router "/" should be always with `exact path`, otherwise non existing routed path will be routed to "/"

                    // if 0 < math.sqrt(long_delta**2 + lat_delta**2) < 0.006 -> within 4 blocks
                    // 0.006 < the_value < 0.012 -> walking
                    // 0.012 < the_value < 0.018 -> biking
                    // 0.018 < the_value < 0.024 -> driving
                    // 0.024 < the_value < 0.050 -> birdview

Google map api key = AIzaSyC4yz_VXPDqonzJZ7q3TTDsgiLmKxk8wgY