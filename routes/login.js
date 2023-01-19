var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var passport = require('passport')
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  router.get('/', function(req, res, next) {
    if(!req.user) {
      let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
      res.render('login', {user: null,authenticated: JSON.parse(authenticated) });
    }
    else {
      let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
      res.render('dashboard', {user: req.user, authenticated: JSON.parse(authenticated)});
    }
  });
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      fs.writeFileSync(path.resolve(__dirname, "../data/authenticated.json"), JSON.stringify({ authenticated: false }));
      res.redirect('/login');
    });
  });

passport.use(new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
    let filteredArray = usersArray.filter(x => x.username = username);
    if (filteredArray.length > 0) {
      let usersData = filteredArray[0];
      if (usersData.password == password) {
        fs.writeFileSync(path.resolve(__dirname, "../data/authenticated.json"), JSON.stringify({ authenticated: true }));
        return cb(null, usersData);
      }
    }
    else {
      fs.writeFileSync(path.resolve(__dirname, "../data/authenticated.json"), JSON.stringify({ authenticated: false }));
      return cb(null, false);
    }
  }));

router.post('/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  }));
router.get('/', function(req, res, next) {
    let authenticated =  fs.readFileSync(path.resolve(__dirname, "../data/authenticated.json"));
    if(authenticated){
      res.render('dashboard',{authenticated: JSON.parse(authenticated)});

    }
    res.render('login',{authenticated: JSON.parse(authenticated)});
  });

  
module.exports = router