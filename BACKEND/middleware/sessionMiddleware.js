//Lets create the session midleware
//Import our db connection and packages

const db = require('../config/db');
const express = require('express');
const session = require('express-session');
const app = express;

//Configure session storage

const MySQLStore = require('express-mysql-session')('session');
const sessionStore = new MySQLStore({},db)

//Lets setup the middleware session

app.use(
 session( {
        secret:process.env.SESSION_SECRET,
        store:sessionStore,
        resave:false,
        saveUninitialized:false,
        cookie:{
          maxAge: 1000* 60 *60, //1hr
          secure:false,
        }}
 )
)



