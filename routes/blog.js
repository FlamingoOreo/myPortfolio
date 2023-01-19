var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser');
const { param } = require('jquery');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog')
});


module.exports = router;