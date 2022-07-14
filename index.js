import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import router from './vote.js'
import { dbConnectionParams } from './db-config.js'

const app = express()
const port = 3001
var connectionTest = mysql.createConnection(dbConnectionParams)
export const pool = mysql.createPool(dbConnectionParams)

app.use(cors())
app.use(express.json())

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.use(router);

app.get('/', (req, res) => {
  res.send('App is running')
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
