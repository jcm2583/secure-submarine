const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // what is the value of req.user????
  if(req.isAuthenticated()) {
    console.log('req.user:', req.user);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

      if(req.user.clearance_level >= 13) {
      pool.query(`SELECT * FROM "secret";`)
      .then((results) => res.send(results.rows))
      .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  }
    else if(req.user.clearance_level >= 6 ) {
      pool.query(`SELECT * FROM "secret" WHERE "secrecy_level" <= 6;`)
      .then( result => { 
        res.send(result.rows)
      }).catch ( err => {
        console.log('Error in clearance level 6', err);
        res.sendStatus(500)
      });
    }
    else if(req.user.clearance_level >= 3) {
      pool.query(`SELECT * FROM "secret" WHERE "secrecy_level" <= 3;`)
      .then( result => {
        res.send(result.rows)
      }).catch ( err => {
        console.log('Error in clearance level 3', err);
      })
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
