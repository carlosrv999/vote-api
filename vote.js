import express from 'express'
import { pool } from './index.js'
const router = express.Router()

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/vote', function(req, res) {
  pool.query(`select emoji_id, count(*) as vote_quantity from votes group by emoji_id order by vote_quantity desc;`, function (error, results, fields) {
    if (error) {
      res.status(500).send(error)
    }
    res.send(results)
  })
})

router.post('/vote', function(req, res) {
  console.log(req.body)
  pool.query(`insert into votes (emoji_id, voting_date) values (?, CURRENT_TIMESTAMP);`, [req.body.emoji_id], function (error, results, fields) {
    if (error) {
      res.status(500).send(error)
    }
    res.send({
      "result":"success",
      "voted": req.body
    })
  })
})

export default router