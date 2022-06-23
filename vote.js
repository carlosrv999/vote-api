var express = require('express');
var router = express.Router();
const pool = require('./index').pool;

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/votes', function(req, res) {
  pool.query(`select emoji_id, count(*) as vote_quantity from votes group by emoji_id order by vote_quantity desc;`, function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    };
    res.send(results);
  });
});

router.post('/votes', function(req, res) {
  console.log(req.body)
  pool.query(`insert into votes (emoji_id, voting_date) values (${req.body.emoji_id}, CURRENT_TIMESTAMP);`, function (error, results, fields) {
  // pool.query(`select emoji_id, count(*) as votes_for from votes group by emoji_id;`, function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    };
    res.send(results);
  });
});

module.exports = router;