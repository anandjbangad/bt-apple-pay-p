var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
    braintreeKey: process.env.AUTHORIZATION_KEY
   });
});

module.exports = router;
