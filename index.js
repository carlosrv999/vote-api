const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
var mysql = require('mysql');
const dbConnectionParams = {
  connectionLimit : 10,
  host            : 'localhost',
  port            : 3306,
  user            : 'voteuser',
  password        : 'DcS5Gb7Gs2W#',
  database        : 'votes',
  charset         : 'utf8mb4'
}

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})