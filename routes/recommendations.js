var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser');
const { param } = require('jquery');
var jsonParser = bodyParser.json()
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();


/* GET home page. */
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  res.render('recommendations', { data: JSON.parse(data)
 });
});
router.post('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  let recommendationsArray = JSON.parse(rawdata);
  const expectedAttributes = ["avatar", "name", "role", "description"];
  Object.keys(req.body).forEach(key =>{
    if(!(expectedAttributes.includes(key))){
      console.log(key);
      res.status(400).end("Wrong attributes");
      return;
    }
  });
  if(req.body.avatar == null || req.body.name == null){
    res.status(400).end("Avatar/Name not provided");
    return;
  };
  if(!([1,2,3].includes(req.body.avatar))){
    res.status(400).end("Wrong avatar provided");
    return;
  };
  if(recommendationsArray.filter(x => x.name === req.body.name).length == 0) {
    const newArray = recommendationsArray.concat([req.body])
    fs.writeFileSync(path.resolve(__dirname, "../data/recommendations.json"), JSON.stringify(newArray));
  }
  res.end();
});

router.delete('/', ensureLoggedIn, jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  let recommendationsArray = JSON.parse(rawdata);
  const newArray = recommendationsArray.filter(x => x.name !== req.body.name)
  if (newArray.length !== recommendationsArray.length ) {
    fs.writeFileSync(path.resolve(__dirname, "../data/recommendations.json"), JSON.stringify(newArray));
  }
  res.end();
});

module.exports = router;