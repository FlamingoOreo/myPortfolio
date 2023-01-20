var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();
/* GET home page. */
router.get('/',ensureLoggedIn, function(req, res, next) {
  let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
  res.render('dashboard',{authenticated: JSON.parse(authenticated)});
});

module.exports = router;