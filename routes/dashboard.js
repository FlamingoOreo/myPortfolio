var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
/* GET home page. */
router.get('/', function(req, res, next) {
  let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
  res.render('dashboard',{authenticated: JSON.parse(authenticated)});
});

module.exports = router;