var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")


/* GET home page. */
router.get('/',function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
  res.render('index', { title: 'Express' , array: JSON.parse(data), authenticated: JSON.parse(authenticated) });
});

module.exports = router;