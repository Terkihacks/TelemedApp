// sessionMiddleware.js
const db = require('../config/db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({}, db);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
     maxAge: 1000 * 60 * 60,
     secure: false }
});

module.exports =  sessionMiddleware;
