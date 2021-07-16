# MySite on Node(Express)

## project manifest 파일(package.json) 생성
$ npm init -y

## 설치패키지
'''bash
$ npm i express
$ npm i express-session
$ npm i ejs
$ npm i dotenv
$ npm i sequelize
$ npm i mysql2
$ npm i multer
$ npm i moment
$ npm i winston
$ npm i winston-daily-rotate-file
$ npm i -D nodemon

## scripts in package-json
'''JSON
.
.
.
  "scripts": {
    "start": "node index.js",
    "debug": "nodemon index.js"
  },
.
.
.
'''

## project structure
<pre>
/mysite
    |--- index.js
    |--- package.json
    |--- package-lock.json
    |--- /node-modules
    |--- /config
    |--- /logging
    |--- /logs
    |--- /multer-temporary-store
    |--- /public
    |       |--- /assets
    |                |--- /gallery
    |--- /routes
    |--- /controllers
    |--- /models
    |--- /views
            |--- /main
            |--- /user
            |--- /guestbook
            |--- /board
            |--- /gallery
            |--- /admin
</pre>