var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

/* GET home page. */

router.post('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(rawdata);
  const newArray = array.concat([req.body.newText])
  fs.writeFileSync(path.resolve(__dirname, "../data/introductionArray.json"), JSON.stringify(newArray));
  res.end();
});
router.delete('/',jsonParser,function(req,res,next){
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(rawdata);
  let index = array.indexOf(req.body.deletedText);
  if(index >= 0){
    array.splice(index,1);
    fs.writeFileSync(path.resolve(__dirname, "../data/introductionArray.json"), JSON.stringify(array));
    res.end();
  }
  res.end();
});

module.exports = router;