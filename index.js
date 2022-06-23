const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
var mysql = require('mysql');
const dbConnectionParams = require('./db-config');
var connectionTest = mysql.createConnection(dbConnectionParams);
module.exports.pool  = mysql.createPool(dbConnectionParams);

app.use(cors())
app.use(express.json())

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.use(require('./vote'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectionTest.connect((err) => {
  if (err) {
    console.log("Error connecting to database: "+err.stack);
    throw err;
  }
  console.log("Successfully connected to database with credentials.");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
