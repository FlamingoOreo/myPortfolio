var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser');
const { param } = require('jquery');


/* GET home page. */
router.get('/', function(req, res, next) {
  let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
  res.render('blog',{authenticated: JSON.parse(authenticated)})
});


module.exports = router;