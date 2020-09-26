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
2. Login = Load them automatically, Store user data after login
3. Logout = Flush all the user related state
4. Profile = Use stored user data from Login

Redux at Restaurant's making events (?)