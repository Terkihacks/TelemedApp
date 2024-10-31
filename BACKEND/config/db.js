
const mysql =  require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    //Access the .env filess
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    session:process.env.SESSION_SECRET,
    
})

// Lets export the db.js to be able to be available in all our files
module.exports = pool.promise()
 //The promise will help us to use the await and async function when creating the web server