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